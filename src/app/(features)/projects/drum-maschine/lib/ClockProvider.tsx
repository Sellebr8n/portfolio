import { nanoid } from 'nanoid';
import {
  createContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react';
import { Signature } from '../types';

type ProviderProps = {
  children: React.ReactNode;
  audioContext: AudioContext;
  worker: Worker;
  options: {
    lookaheadMs: number;
    scheduleAheadTimeSecs: number;
  };
};

type ContextProps = {
  clockRunning: boolean;
  currentTempo: number;
  audioContext: AudioContext;
  start: () => void;
  scheduleEvent: (signature: Signature, fn: (options: SubscriberOptions) => void) => () => void;
  setTempo: (num: number) => void;
};

const Context = createContext<ContextProps>({
  clockRunning: false,
  currentTempo: 120,
  audioContext: undefined as unknown as AudioContext,
  start: () => undefined,
  scheduleEvent: () => () => undefined,
  setTempo: () => undefined,
});

enum tempoDivisions {
  'sixteenths' = 0.0625,
  'eights' = 0.125,
  'quarter' = 0.25,
  'third' = 0.3333333333333333,
  'half' = 0.5,
}

type SubscriberOptions = {
  beat: number;
  time: number;
  context: AudioContext;
};

type Subscriber = (options: SubscriberOptions) => void;

export const useClockContext = () => {
  const audioCtx = useContext(Context);
  if (!audioCtx) {
    throw new Error('useAudioContext must be used within a AudioContextProvider');
  }
  return audioCtx;
};

export const useScheduleSound = (signature: Signature, fn: Subscriber) => {
  const { scheduleEvent, clockRunning } = useClockContext();
  useEffect(() => {
    let descheduleEvent: () => void = () => undefined;
    if (clockRunning) {
      descheduleEvent = scheduleEvent(signature, fn);
    }
    return descheduleEvent;
  }, [fn, scheduleEvent, clockRunning, signature]);
};

const ClockProvider: React.FC<ProviderProps> = ({ children, audioContext, worker, options }) => {
  const { lookaheadMs, scheduleAheadTimeSecs } = options;

  const nextNoteTime = useRef<number>(0.0);
  const current16thNote = useRef<number>(0);

  const [tempo, setTempo] = useState(80);
  const [clockRunning, setClockRunning] = useState(false);

  const scheduledEvents = useMemo(() => new Map<string, [Subscriber, Signature]>(), []);

  const scheduleEvent = useCallback(
    (signature: Signature, fn: Subscriber) => {
      const id = nanoid();
      scheduledEvents.set(id, [fn, signature]);
      return () => {
        scheduledEvents.delete(id);
      };
    },
    [scheduledEvents]
  );

  const scheduler = useCallback(() => {
    while (nextNoteTime.current < audioContext.currentTime + scheduleAheadTimeSecs) {
      scheduledEvents.forEach(([fn, signature]) => {
        if (signature === 'quarter' && current16thNote.current % 4 === 0) {
          fn({
            beat: Math.floor(current16thNote.current / 4) + 1,
            time: nextNoteTime.current,
            context: audioContext,
          });
        } else if (signature === 'eights' && current16thNote.current % 2 === 0) {
          fn({
            beat: Math.floor(current16thNote.current / 2) + 1,
            time: nextNoteTime.current,
            context: audioContext,
          });
        } else if (signature === 'sixteenths') {
          fn({
            beat: current16thNote.current + 1,
            time: nextNoteTime.current,
            context: audioContext,
          });
        }
      });

      /** Setup next bar **/
      const beatDurationSeconds = 60.0 / tempo; // Notice this picks up the current tempo value to calculate beat length.
      const barDurationSeconds = tempoDivisions.quarter * beatDurationSeconds; // Add beat length to last beat time

      nextNoteTime.current += barDurationSeconds; // Advance the beat time by a beat length
      current16thNote.current = (current16thNote.current + 1) % 16;
    }
  }, [audioContext, scheduleAheadTimeSecs, scheduledEvents, tempo]);

  useEffect(() => {
    worker.onmessage = (e) => {
      if (e.data === 'tick') {
        scheduler();
      } else {
        throw new Error('Unknown message: ' + e.data);
      }
    };
  }, [scheduler, worker]);

  useEffect(() => {
    worker.postMessage({ interval: lookaheadMs });
    scheduledEvents.clear();
  }, [lookaheadMs, scheduledEvents, worker]);

  useEffect(() => {
    if (clockRunning) {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      nextNoteTime.current = audioContext.currentTime + scheduleAheadTimeSecs;
      current16thNote.current = 0;
      worker.postMessage('start');
    } else {
      worker.postMessage('stop');
      scheduledEvents.clear();
    }
  }, [audioContext, scheduleAheadTimeSecs, scheduledEvents, clockRunning, worker]);

  return (
    <Context.Provider
      value={{
        currentTempo: tempo,
        clockRunning,
        scheduleEvent,
        audioContext,
        start: () => setClockRunning((prev) => !prev),
        setTempo: (num: number) => setTempo(num),
      }}>
      {children}
    </Context.Provider>
  );
};

export default ClockProvider;
