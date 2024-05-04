'use client';

import React from 'react';
import { useClockContext, useScheduleSound } from './ClockProvider';

const Metronome: React.FC = () => {
  const { start, clockRunning, currentTempo, setTempo } = useClockContext();

  useScheduleSound((beat, time, actx) => {
    const osc = actx.createOscillator();
    osc.connect(actx.destination);
    if (beat % 16 === 0) {
      osc.frequency.value = 880.0;
    } else if (beat % 4 === 0) {
      osc.frequency.value = 440.0;
    } else {
      return;
    }
    const noteLenght = 0.05; // length of "beep" (in seconds)
    osc.start(time);
    osc.stop(time + noteLenght);
  }, 0);

  return (
    <div className="flex flex-col mx-auto">
      <div className="p-4">
        <label
          htmlFor="tempo-ctrl"
          className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Tempo: {currentTempo}
        </label>
        <input
          id="tempo-ctrl"
          type="range"
          min={60}
          max={240}
          value={currentTempo}
          step={1}
          onChange={(e) => setTempo(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
        />
      </div>
      <button
        type="button"
        onClick={start}
        className="rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
        {clockRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default Metronome;
