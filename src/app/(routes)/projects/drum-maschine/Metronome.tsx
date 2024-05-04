import React from 'react';
import { useClockContext, useScheduleSound } from './ClockProvider';
import { FaPowerOff, FaPause, FaPlay } from 'react-icons/fa6';
import classNames from 'classnames';

const Metronome: React.FC = () => {
  const [active, setActive] = React.useState<boolean>(false);
  const { start, clockRunning, currentTempo, setTempo } = useClockContext();

  useScheduleSound('quarter', ({ beat, time, context }) => {
    if (!active) {
      return;
    }
    const osc = context.createOscillator();
    const gain = context.createGain();
    gain.gain.value = 0.1;
    osc.connect(gain);
    gain.connect(context.destination);
    osc.frequency.value = beat === 1 ? 880 : 440;
    const noteLenght = 0.05; // length of "beep" (in seconds)
    osc.start(time);
    osc.stop(time + noteLenght);
  });

  return (
    <div className="flex flex-col mx-auto bg-zinc-100 border-2 border-zinc-600 rounded-lg p-8">
      <FaPowerOff
        onClick={() => setActive((prev) => !prev)}
        className={classNames('absolute right-14 top-20 text-lg ', {
          'text-indigo-600': active,
          'text-slate-400': !active,
        })}
      />
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
        {clockRunning ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

export default Metronome;
