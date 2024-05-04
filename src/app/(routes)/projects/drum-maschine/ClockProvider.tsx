'use client';

import {
  createContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  useContext,
} from 'react';

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
  currentBeat: number;
  currentTempo: number;
  audioContext: AudioContext;
  start: () => void;
  scheduleEvent: (
    fn: (beat: number, time: number, audioContext: AudioContext) => void,
    delay: number
  ) => void;
  setTempo: (num: number) => void;
};

const Context = createContext<ContextProps>({
  clockRunning: false,
  currentBeat: 0,
  currentTempo: 120,
  audioContext: undefined as unknown as AudioContext,
  start: () => undefined,
  scheduleEvent: () => undefined,
  setTempo: () => undefined,
});

enum Signature {
  'sixteenths' = 0.0625,
  'eights' = 0.125,
  'quarter' = 0.25,
  'third' = 0.3333333333333333,
  'half' = 0.5,
}

export const useClockContext = () => {
  const audioCtx = useContext(Context);
  if (!audioCtx) {
    throw new Error('useAudioContext must be used within a AudioContextProvider');
  }
  return audioCtx;
};

export const useScheduleSound = (
  fn: (beat: number, time: number, audioContext: AudioContext) => void,
  delay: number
) => {
  const { currentBeat, scheduleEvent, clockRunning } = useClockContext();
  useEffect(() => {
    if (clockRunning) {
      scheduleEvent(fn, delay);
    }
  }, [fn, delay, scheduleEvent, currentBeat, clockRunning]);
};

const ClockProvider: React.FC<ProviderProps> = ({ children, audioContext, worker, options }) => {
  const { lookaheadMs, scheduleAheadTimeSecs } = options;

  const nextNoteTime = useRef<number>(0.0);

  const [bar, setBar] = useState(0);
  const [signature, setSignature] = useState(4);

  const [current16thNote, setCurrent16thNote] = useState(0);
  const [tempo, setTempo] = useState(120);
  const [clockRunning, setClockRunning] = useState(false);

  const scheduledEvents = useMemo(
    () => new Set<(beat: number, time: number, audioContext: AudioContext) => void>(),
    []
  );

  const scheduleEvent = useCallback(
    (fn: (beat: number, time: number, audioContext: AudioContext) => void, delay: number) => {
      scheduledEvents.add(fn);
    },
    [scheduledEvents]
  );

  const scheduler = useCallback(() => {
    while (nextNoteTime.current < audioContext.currentTime + scheduleAheadTimeSecs) {
      scheduledEvents.forEach((fn) => {
        fn(current16thNote, nextNoteTime.current, audioContext);
        scheduledEvents.delete(fn);
      });

      const secondsPerBeat = 60.0 / tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
      nextNoteTime.current += Signature.quarter * secondsPerBeat; // Add beat length to last beat time
      setCurrent16thNote((prev) => (prev + 1) % 16);
    }
  }, [audioContext, current16thNote, scheduleAheadTimeSecs, scheduledEvents, tempo]);

  useEffect(() => {
    worker.onmessage = (e) => {
      if (e.data === 'tick') {
        scheduler();
      } else {
        throw new Error('Unknown message: ' + e.data);
      }
    };
    worker.postMessage({ interval: lookaheadMs });
  }, [lookaheadMs, scheduler, worker]);

  useEffect(() => {
    if (clockRunning) {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      nextNoteTime.current = audioContext.currentTime + scheduleAheadTimeSecs;
      worker.postMessage('start');
      setCurrent16thNote(0);
    } else {
      worker.postMessage('stop');
      scheduledEvents.clear();
    }
  }, [audioContext, scheduleAheadTimeSecs, scheduledEvents, clockRunning, worker]);

  return (
    <Context.Provider
      value={{
        currentBeat: current16thNote,
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
