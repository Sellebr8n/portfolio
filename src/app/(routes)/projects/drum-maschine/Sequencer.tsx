import { useEffect, useRef, useState } from 'react';
import { useScheduleSound } from './ClockProvider';
import classNames from 'classnames';

const fetchSound = async (audioSrc: string) => {
  const response = await fetch(audioSrc);
  const arrayBuffer = await response.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

const Pad = ({ step }: { step: number }) => {
  const [active, setActive] = useState<boolean>(false);
  const [sound, setSound] = useState<AudioBuffer>();
  useEffect(() => {
    fetchSound('/audio/RDM_Analog_SY1-Kick01.wav').then((data) => {
      setSound(data);
    });
  }, []);

  useScheduleSound((currentBeat, time, audioContext) => {
    if (currentBeat % 4 !== 0) {
      return;
    }
    if (active && sound && step === currentBeat / 4 + 1) {
      const source = audioContext.createBufferSource();
      source.buffer = sound;
      source.connect(audioContext.destination);
      source.start(time + Math.random() * 0.01);
    }
  }, 0);

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
      <section className="grid grid-cols-5 gap-4 grid-rows-2 bg-zinc-100 border-2 border-zinc-600 rounded-lg p-8">
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
          <span className=" text-sm">Kick</span>
        </div>
        <Pad step={1} />
        <Pad step={2} />
        <Pad step={3} />
        <Pad step={4} />
      </section>
    </div>
  );
};

export default Sequencer;
