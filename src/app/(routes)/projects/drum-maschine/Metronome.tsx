'use client';

import React, { useCallback } from 'react';
import { useAudioContext } from './AudioContext';
import useMetronome from './useMetronome';

const noteLength = 0.05;

const Metronome: React.FC = () => {
  const audioContext = useAudioContext();
  const { tempo, isPlaying, togglePlay, setTempo, connect, step, beatsPerBar, setBeatsPerBar } =
    useMetronome();

  const playClick = useCallback(
    (beat: number, time: number) => {
      if (!audioContext) return;
      const osc = audioContext.createOscillator();
      osc.connect(audioContext.destination);
      osc.frequency.value = beat % beatsPerBar === 0 ? 1000 : 800;
      osc.start(time);
      osc.stop(time + noteLength);
    },
    [audioContext, beatsPerBar]
  );

  connect(playClick);

  return (
    <div>
      <h2>Metronome</h2>
      <label>
        Tempo{' '}
        <input
          type="range"
          min="60"
          max="240"
          value={tempo}
          onChange={(e) => setTempo(parseInt(e.target.value))}
        />
      </label>
      <label>
        Beats per bar{' '}
        <input
          type="range"
          min="4"
          max="16"
          step="4"
          value={beatsPerBar}
          onChange={(e) => setBeatsPerBar(parseInt(e.target.value))}
        />
      </label>
      <p>tempo: {tempo} BPM</p>
      <p>beats per bar: {beatsPerBar}</p>
      <p>beat: {step}</p>
      <button onClick={togglePlay}>{isPlaying ? 'Stop' : 'Play'} Click</button>
    </div>
  );
};

export default Metronome;
