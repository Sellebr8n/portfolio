'use client';

import React, { useEffect, useMemo, useRef } from 'react';
import { useAudioContext } from './ClockProvider';

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

const Metronome: React.FC<{ audioContext: AudioContext }> = ({ audioContext }) => {
  const { start, clockRunning, currentBeat, scheduleEvent, currentTempo, setTempo } =
    useAudioContext();

  useEffect(() => {
    if (clockRunning) {
      scheduleEvent((beat, time) => {
        const osc = audioContext.createOscillator();
        osc.connect(audioContext.destination);

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
    }
  }, [audioContext, clockRunning, currentBeat, scheduleEvent]);

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
      <div className="p-4">Step: {currentBeat}</div>
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
