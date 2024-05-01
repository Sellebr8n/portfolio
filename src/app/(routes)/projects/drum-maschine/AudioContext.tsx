'use client';

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

let startTime; // The start time of the entire sequence.
let lookaheadMs = 10; // How frequently to call scheduling function (in milliseconds)
let scheduleAheadTimeSecs = 0.15; // How far ahead to schedule audio (sec)

const toleranceLate = 0.1;
const toleranceEarly = 0.001;
// This is calculated from lookaheadMs, and overlaps

type ProviderProps = {
  children: React.ReactNode;
};

type ContextProps = {
  audioContext: AudioContext | null;
  worker: Worker | null;
  start: () => void;
  clockRunning: boolean;
  currentTempo: number;
  setTempo: (num: number) => void;
  currentBeat: number;
};

const Context = createContext<ContextProps>({
  audioContext: null,
  worker: null,
  start: () => undefined,
  currentBeat: 0,
  currentTempo: 120,
  setTempo: () => undefined,
  clockRunning: false,
});

export const useAudioContext = () => {
  const audioCtx = useContext(Context);
  if (!audioCtx) {
    throw new Error('useAudioContext must be used within a AudioContextProvider');
  }
  return audioCtx;
};

enum NoteResolution {
  'sixteenths' = 0.0625,
  'eights' = 0.125,
  'quarter' = 0.25,
  'third' = 0.3333333333333333,
  'half' = 0.5,
}

const AudioContextProvider: React.FC<ProviderProps> = ({ children }) => {
  const isBrowser = useMemo(() => typeof window !== 'undefined', []);

  const nextNoteTime = useRef<number>(0.0);

  const [tempo, setTempo] = useState(120);

  const [noteResolution, setNoteResolution] = useState<NoteResolution>(NoteResolution.quarter);
  const [current16thNote, setCurrent16thNote] = useState(0);

  const [startClock, setStartClock] = useState(false);

  const audioContext = useMemo(() => {
    if (!isBrowser) return null;
    window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    return new window.AudioContext();
  }, [isBrowser]);

  const worker = useMemo(() => {
    if (!isBrowser) return null;
    return new Worker('/scripts/metronomeWorker.js');
  }, [isBrowser]);

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60.0 / tempo; // Notice this picks up the CURRENT tempo value to calculate beat length.
    nextNoteTime.current += noteResolution * secondsPerBeat; // Add beat length to last beat time
    setCurrent16thNote((currentNote) => {
      return (currentNote + 1) % 16;
    });
  }, [noteResolution, tempo]);

  const scheduleNote = useCallback(
    (beat: number, time: number) => {
      if (!audioContext) return;
      if (
        (noteResolution == NoteResolution.eights && beat % 2) ||
        (noteResolution == NoteResolution.quarter && beat % 4)
      ) {
        return;
      }

      const osc = audioContext.createOscillator();
      osc.connect(audioContext.destination);
      if (beat % 16 === 0) {
        osc.frequency.value = 880.0;
      } else if (beat % 4 === 0) {
        osc.frequency.value = 440.0;
      } else {
        osc.frequency.value = 220.0;
      }
      const noteLenght = 0.05; // length of "beep" (in seconds)
      osc.start(time);
      osc.stop(time + noteLenght);
    },
    [audioContext, noteResolution]
  );

  const scheduler = useCallback(() => {
    if (!audioContext) return;
    while (nextNoteTime.current < audioContext.currentTime + scheduleAheadTimeSecs) {
      scheduleNote(current16thNote, nextNoteTime.current);
      nextNote();
    }
  }, [audioContext, current16thNote, nextNote, scheduleNote]);

  useEffect(() => {
    if (!audioContext) return;
    if (!worker) return;
    worker.onmessage = (e) => {
      if (e.data === 'tick') {
        scheduler();
      } else {
        console.log('message: ' + e.data);
      }
    };
    worker.postMessage({ interval: lookaheadMs });
  }, [audioContext, scheduler, worker]);

  useEffect(() => {
    if (!audioContext) return;
    if (startClock) {
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      setCurrent16thNote(0);
      nextNoteTime.current = audioContext.currentTime + scheduleAheadTimeSecs;
      worker?.postMessage('start');
    } else {
      worker?.postMessage('stop');
    }
  }, [audioContext, startClock, worker]);

  return (
    <Context.Provider
      value={{
        audioContext,
        worker,
        currentBeat: current16thNote,
        currentTempo: tempo,
        clockRunning: startClock,
        setTempo: (num: number) => setTempo(num),
        start: () => setStartClock((prev) => !prev),
      }}>
      {children}
    </Context.Provider>
  );
};

export default AudioContextProvider;
