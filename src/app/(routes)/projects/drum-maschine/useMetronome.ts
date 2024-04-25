'use client';

import { nanoid } from 'nanoid';
import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { useAudioContext } from './AudioContext';

const scheduleAheadTime = 0.1;
const lookahead = 25; // how often to call the scheduler to check if notes need to be played

let worker: Worker | null = null;

const useMetronome = () => {
  const audioContext = useAudioContext();

  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [step, setStep] = useState(0);
  const [beatsPerBar, setBeatsPerBar] = useState(4);

  const nextNoteTime = useRef(0);

  const connectedSounds: Map<string, (beat: number, time: number) => void> = useMemo(
    () => new Map(),
    []
  );

  const connect = useCallback(
    (fn: (beat: number, time: number) => void) => {
      const id = nanoid();
      connectedSounds.set(id, fn);
      return () => {
        connectedSounds.delete(id);
      };
    },
    [connectedSounds]
  );

  const next = useCallback(() => {
    // prepare for the next note
    const secondsPerBeat = 60 / tempo;
    nextNoteTime.current += secondsPerBeat;
    setStep((prev) => (prev + 1) % beatsPerBar);
  }, [beatsPerBar, tempo]);

  const scheduler = useCallback(
    (audioContext: AudioContext) => {
      while (nextNoteTime.current < audioContext.currentTime + scheduleAheadTime) {
        // play the note at the current step
        // fns.forEach((fn) => fn(step.current, nextNoteTime.current));
        connectedSounds.forEach((fn) => fn(step, nextNoteTime.current));
        next();
      }
    },
    [connectedSounds, next, step]
  );

  const togglePlay = useCallback(() => {
    if (!audioContext) return;
    if (!isPlaying) {
      setStep(0);
      nextNoteTime.current = audioContext.currentTime;
      worker?.postMessage('start');
      setIsPlaying(true);
    } else {
      worker?.postMessage('stop');
      setIsPlaying(false);
    }
  }, [audioContext, isPlaying]);

  useEffect(() => {
    if (audioContext) {
      if (!worker) {
        worker = new Worker('/scripts/metronomeWorker.js');
      }
      worker.postMessage({ interval: lookahead });
      worker.onmessage = (e) => {
        if (e.data === 'tick') {
          scheduler(audioContext);
        }
      };
    }
  }, [audioContext, scheduler]);

  return {
    tempo,
    isPlaying,
    togglePlay,
    step,
    setTempo,
    connect,
    beatsPerBar,
    setBeatsPerBar,
  };
};

export default useMetronome;
