import { useState } from 'react';
import { useScheduleSound } from './ClockProvider';
import classNames from 'classnames';

const Pad = () => {
  const [active, setActive] = useState<boolean>(false);

  return (
    <div
      onClick={() => setActive((prev) => !prev)}
      className={classNames('max-h-6 max-w-6 p-4', {
        'bg-indigo-500': active,
        'bg-slate-200': !active,
      })}></div>
  );
};

const Sequencer = () => {
  const [beat, setBeat] = useState<number>(1);

  useScheduleSound((currentBeat) => {
    if (currentBeat % 16 === 0 || currentBeat % 4 === 0) {
      setBeat(currentBeat / 4 + 1);
    }
  }, 0);

  return (
    <div className="p-8">
      <h2>Sequencer</h2>
      <div>current beat: {beat}</div>
      <section className="grid grid-cols-5 gap-4 grid-rows-2">
        <div />
        <div
          className={classNames('max-h-6 max-w-6 p-4 rounded-full', {
            'bg-indigo-500': beat === 1,
            'bg-slate-200': beat !== 1,
          })}></div>
        <div
          className={classNames('max-h-6 max-w-6 p-4 rounded-full', {
            'bg-indigo-500': beat === 2,
            'bg-slate-200': beat !== 2,
          })}></div>
        <div
          className={classNames('max-h-6 max-w-6 p-4 rounded-full', {
            'bg-indigo-500': beat === 3,
            'bg-slate-200': beat !== 3,
          })}></div>
        <div
          className={classNames('max-h-6 max-w-6 p-4 rounded-full', {
            'bg-indigo-500': beat === 4,
            'bg-slate-200': beat !== 4,
          })}></div>

        <div className="bg-slate-200 p-4">
          <span className=" text-sm">Kick sample</span>
        </div>
        <Pad />
        <Pad />
        <Pad />
        <Pad />
      </section>
    </div>
  );
};

export default Sequencer;