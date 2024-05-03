'use client';

import Metronome from './Metronome';
import ClockProvider from './ClockProvider';
import { useEffect, useState } from 'react';

export default function DrumMaschine() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  useEffect(() => {
    setAudioContext(new AudioContext());
  }, []);

  if (!audioContext) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <ClockProvider
        audioContext={audioContext}
        options={{
          lookaheadMs: 10,
          scheduleAheadTimeSecs: 0.15,
        }}>
        <div className="p-8">
          <h2>Metronome</h2>
          <Metronome audioContext={audioContext} />
        </div>
        <div className="p-8">
          <h2>Drum Maschine</h2>
          <section className="grid grid-cols-4 grid-rows-4"></section>
        </div>
      </ClockProvider>
    </div>
  );
}
