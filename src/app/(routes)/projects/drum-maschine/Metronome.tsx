'use client';

import React, { useEffect, useRef } from 'react';
import { useAudioContext } from './AudioContext';

const Range = ({
  label,
  onChange,
  min,
  max,
  step,
  value,
  id,
}: {
  label: string;
  onChange?: (num: number) => void;
  min: number;
  max: number;
  step: number;
  id: string;
  value: number;
}) => {
  return (
    <div className="p-4">
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => (onChange ? onChange(parseFloat(e.target.value)) : undefined)}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
};

const Metronome: React.FC = () => {
  const beatCounter = useRef(0);
  const { start, clockRunning, currentBeat, currentTempo, setTempo } = useAudioContext();

  useEffect(() => {
    if (clockRunning) {
      if (currentBeat % 16 === 0) {
        beatCounter.current++;
      }
      if (beatCounter.current === 4) {
        beatCounter.current = 0;
      }
    } else {
      beatCounter.current = 0;
    }
  }, [clockRunning, currentBeat]);

  return (
    <div className="flex flex-col mx-auto">
      <Range
        label={`Tempo: ${currentTempo}`}
        onChange={setTempo}
        min={60}
        max={240}
        step={1}
        id="tempo-ctrl"
        value={currentTempo}
      />
      <div className="p-4">Step: {beatCounter.current + 1}</div>
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
