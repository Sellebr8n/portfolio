'use client';

import { useEffect, useMemo, useState } from 'react';
import ClockProvider from './lib/ClockProvider';
import Metronome from './components/Metronome';
import PlayController from './components/PlayController';
import Sequencer from './components/Sequencer';

export default function DrumMaschine() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  useEffect(() => {
    setAudioContext((pre) => {
      if (pre) return pre;
      return new AudioContext();
    });
  }, []);

  const worker = useMemo(() => {
    if (typeof window === 'undefined') return null;
    return new Worker('/scripts/metronomeWorker.js');
  }, []);

  if (!audioContext || !worker) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ClockProvider
        audioContext={audioContext}
        worker={worker}
        options={{
          lookaheadMs: 10,
          scheduleAheadTimeSecs: 0.15,
        }}>
        <PlayController />
        <Metronome />
        <Sequencer />
      </ClockProvider>
    </div>
  );
}
