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
          <section className="flex flex-row gap-10">
            <h3 className='p-2 bg-slate-200 h-[5em] flex items-center'>Kick sample</h3>
            <div className="p-2 gap-2 bg-indigo-50 w-[5em] h-[5em] border-2 border-indigo-700"></div>
            <div className="p-2 gap-2 bg-indigo-50 w-[5em] h-[5em] border-2 border-indigo-700"></div>
            <div className="p-2 gap-2 bg-indigo-50 w-[5em] h-[5em] border-2 border-indigo-700"></div>
            <div className="p-2 gap-2 bg-indigo-50 w-[5em] h-[5em] border-2 border-indigo-700"></div>
          </section>
        </div>
      </ClockProvider>
    </div>
  );
}
