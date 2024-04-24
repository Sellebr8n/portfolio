'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAudioContext } from './AudioContext';

const scheduleAheadTime = 0.1;
const lookahead = 25; // how often to call the scheduler to check if notes need to be played
const noteLength = 0.05;
const beatsPerBar = 8;

const Metronome: React.FC = () => {
  const audioContext = useAudioContext();

  const [playing, setPlaying] = useState(false);

  const tempo = useRef(120);
  const step = useRef(0);
  const nextNoteTime = useRef(0);
  const timerWorker = useRef<Worker | null>(null);

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60 / tempo.current;
    nextNoteTime.current += secondsPerBeat;
    step.current = (step.current + 1) % beatsPerBar;
  }, [tempo]);

  const scheduleNote = useCallback(
    (currentBeat: number, time: number) => {
      if (!audioContext) return;

      const osc = audioContext.createOscillator();

      osc.connect(audioContext.destination);
      osc.frequency.value = currentBeat % beatsPerBar === 0 ? 1000 : 800;
      osc.start(time);
      osc.stop(time + noteLength);
    },
    [audioContext]
  );

  const scheduler = useCallback(() => {
    if (!audioContext) return;
    while (nextNoteTime.current < audioContext.currentTime + scheduleAheadTime) {
      // schedule the note should be a list of callbacks to handle multiple samples being played at the same time
      scheduleNote(step.current, nextNoteTime.current);
      nextNote();
    }
  }, [audioContext, nextNote, scheduleNote]);

  const togglePlay = useCallback(() => {
    if (!audioContext) return;
    if (!playing) {
      step.current = 0;
      nextNoteTime.current = audioContext.currentTime;
      timerWorker.current?.postMessage('start');
      setPlaying(true);
    } else {
      timerWorker.current?.postMessage('stop');
      setPlaying(false);
    }
  }, [audioContext, playing]);

  useEffect(() => {
    timerWorker.current = new Worker('/scripts/metronomeWorker.js');
    timerWorker.current.onmessage = (e) => {
      if (e.data === 'tick') {
        scheduler();
      }
    };
    timerWorker.current.postMessage({ interval: lookahead });
  }, [scheduler]);
  return (
    <div>
      <h2>Metronome</h2>
      <p>current: {tempo.current} BPM</p>
      <input
        type="range"
        min="60"
        max="240"
        value={tempo.current}
        onChange={(e) => (tempo.current = parseInt(e.target.value))}
      />
      <button onClick={togglePlay}>{playing ? 'Stop' : 'Play'} Click</button>
    </div>
  );
};

export default Metronome;
