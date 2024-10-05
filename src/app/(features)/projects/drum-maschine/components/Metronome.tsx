import React from 'react';
import { useScheduleSound } from '../lib/ClockProvider';
import { FaPowerOff } from 'react-icons/fa6';
import classNames from 'classnames';
import { Signature } from '../types';

const Metronome: React.FC = () => {
  const [active, setActive] = React.useState<boolean>(true);
  const [currentBeat, setCurrentBeat] = React.useState<number>(1);
  const [signature, setSignature] = React.useState<Signature>('sixteenths');

  useScheduleSound(signature, ({ beat, time, context }) => {
    setCurrentBeat(beat);
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
    <div className="flex flex-col flex-1 p-8">
      <h2>Metronome</h2>
      <div className="flex flex-col bg-zinc-100 border-2 border-zinc-600 rounded-lg p-4">
        <select
          defaultValue={signature}
          onChange={(e) => setSignature(e.target.value as Signature)}
          className="block px-0 mb-4 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-400 peer">
          <option value="quarter">Quarter</option>
          <option value="eights">Eights</option>
          <option value="sixteenths">Sixteenths</option>
        </select>
        <div className="flex justify-between">
          <FaPowerOff
            onClick={() => setActive((prev) => !prev)}
            className={classNames('text-4xl', {
              'text-indigo-600': active,
              'text-slate-400': !active,
            })}
          />
          <div className="text-center">
            beat <span className="w-4">{currentBeat}</span> of{' '}
            {signature === 'sixteenths' ? 16 : signature === 'eights' ? 8 : 4}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metronome;
