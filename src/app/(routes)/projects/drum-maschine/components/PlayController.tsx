import React from 'react';
import { useClockContext } from '../lib/ClockProvider';
import { FaPause, FaPlay } from 'react-icons/fa6';

const PlayController: React.FC = () => {
  const { start, clockRunning, currentTempo, setTempo } = useClockContext();

  return (
    <div className="p-8 max-w-[250px]">
      <h2>Play controller</h2>
      <div className="p-4 flex flex-col bg-zinc-100 border-2 border-zinc-600 rounded-lg">
        <div>Current Tempo: {currentTempo}</div>
        <div>
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
          className="mt-4 h-10 w-10 flex flex-col items-center justify-center rounded-full bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          {clockRunning ? <FaPause /> : <FaPlay />}
        </button>
      </div>
    </div>
  );
};

export default PlayController;
