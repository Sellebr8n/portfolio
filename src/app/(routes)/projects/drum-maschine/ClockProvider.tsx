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
  options: {
    lookaheadMs: number;
    scheduleAheadTimeSecs: number;
  };
};

type ContextProps = {
  start: () => void;
  clockRunning: boolean;
  currentTempo: number;
  scheduleEvent: (fn: (beat: number, time: number) => void, delay: number) => void;
  setTempo: (num: number) => void;
  currentBeat: number;
};

const Context = createContext<ContextProps>({
  clockRunning: false,
  currentBeat: 0,
  currentTempo: 120,
  start: () => undefined,
  scheduleEvent: () => undefined,
  setTempo: () => undefined,
});

enum NoteResolution {
  'sixteenths' = 0.0625,
  'eights' = 0.125,
  'quarter' = 0.25,
  'third' = 0.3333333333333333,
  'half' = 0.5,
}

export const useAudioContext = () => {
  const audioCtx = useContext(Context);
  if (!audioCtx) {
    throw new Error('useAudioContext must be used within a AudioContextProvider');
  }
  return audioCtx;
};

const ClockProvider: React.FC<ProviderProps> = ({ children, audioContext, options }) => {
  const { lookaheadMs, scheduleAheadTimeSecs } = options;

  const worker = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new Worker('/scripts/metronomeWorker.js');
  }, []);

  const nextNoteTime = useRef<number>(0.0);
  const current16thNote = useRef<number>(0);

  const [tempo, setTempo] = useState(120);
  const [beatCount, setBeatCount] = useState(0);
  const [clockRunning, setClockRunning] = useState(false);

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60.0 / tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
    nextNoteTime.current += NoteResolution.quarter * secondsPerBeat; // Add beat length to last beat time
    current16thNote.current = (current16thNote.current + 1) % 16;
    setBeatCount(current16thNote.current);
  }, [tempo]);

  const scheduledEvents = useMemo(() => [] as ((beat: number, time: number) => void)[], []);

  const scheduleEvent = useCallback(
    (fn: (beat: number, time: number) => void, delay: number) => {
      scheduledEvents.push(fn);
    },
    [scheduledEvents]
  );

  const scheduler = useCallback(() => {
    while (nextNoteTime.current < audioContext.currentTime + scheduleAheadTimeSecs) {
      scheduledEvents.forEach((fn, index) => {
        fn(current16thNote.current, nextNoteTime.current);
        scheduledEvents.splice(index, 1);
      });

      nextNote();
    }
  }, [audioContext.currentTime, nextNote, scheduleAheadTimeSecs, scheduledEvents]);

  useEffect(() => {
    if (!worker) return;
    worker.onmessage = (e) => {
      if (e.data === 'tick') {
        scheduler();
      } else {
        console.log('message: ' + e.data);
      }
    };
    worker.postMessage({ interval: lookaheadMs });
  }, [lookaheadMs, scheduler, worker]);

  useEffect(() => {
    if (clockRunning) {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      current16thNote.current = 0;
      setBeatCount(current16thNote.current);
      nextNoteTime.current = audioContext.currentTime + scheduleAheadTimeSecs;
      worker?.postMessage('start');
    } else {
      worker?.postMessage('stop');
      scheduledEvents.splice(0, scheduledEvents.length);
    }
  }, [audioContext, scheduleAheadTimeSecs, scheduledEvents, clockRunning, worker]);

  return (
    <Context.Provider
      value={{
        currentBeat: beatCount,
        currentTempo: tempo,
        clockRunning,
        start: () => setClockRunning((prev) => !prev),
        scheduleEvent,
        setTempo: (num: number) => setTempo(num),
      }}>
      {children}
    </Context.Provider>
  );
};

export default ClockProvider;
