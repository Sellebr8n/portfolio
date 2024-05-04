'use client';

import Metronome from './Metronome';
import ClockProvider from './ClockProvider';
import { useEffect, useMemo, useState } from 'react';
import Sequencer from './Sequencer';

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
        <div className="p-8">
          <h2>Metronome</h2>
          <Metronome />
        </div>
        <Sequencer />
      </ClockProvider>
    </div>
  );
}
