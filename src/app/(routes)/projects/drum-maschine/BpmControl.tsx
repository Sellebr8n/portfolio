'use client';

import React, { useState, useEffect } from 'react';

const getTempo = (bpm: number) => {
  return 60 / bpm;
};

const scheduler = (bpm: number, isPlaying: boolean) => {
  const audioCtx = new AudioContext();
  const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
  const scheduleAheadTime = 0.1; // How far ahead to schedule audio (sec)
  let currentNote = 0;
  let nextNoteTime = 0.0;

  const playNote = () => {
    console.log('play note');
  };

  const nextNote = () => {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime += secondsPerBeat;
    currentNote++;
    if (currentNote === 4) {
      currentNote = 0;
    }
  };

  const scheduleNote = () => {
    while (nextNoteTime < audioCtx.currentTime + scheduleAheadTime) {
      playNote();
      nextNote();
    }
  };
};

const useMetronome = (bpm: number, isPlaying: boolean) => {};

const Metronome: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);

  useEffect(() => {
    let timerID: number | undefined;
    if (isPlaying) {
      const interval = 60000 / bpm; // Convert BPM to interval in milliseconds
      timerID = window.setInterval(() => {
        playClick();
      }, interval);
      return () => window.clearInterval(timerID);
    } else {
      if (timerID) {
        window.clearInterval(timerID);
      }
    }
  }, [isPlaying, bpm]);

  const playClick = () => {
    const audioContext = new AudioContext();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.type = 'square';
    gainNode.gain.value = 0.2; // Adjust volume
    oscillator.frequency.value = 1000; // Frequency in Hz

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1); // sound length
  };

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(parseInt(event.target.value));
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <div>{`BPM: ${bpm}`}</div>
      <input type="range" min="60" max="240" value={bpm} onChange={handleBpmChange} />
      <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Start'}</button>
    </div>
  );
};

export default Metronome;
