import { useEffect, useState } from 'react';
import { useScheduleSound } from '../lib/ClockProvider';
import classNames from 'classnames';
import { Signature } from '../types';

const fetchSound = async (audioSrc: string) => {
  const response = await fetch(audioSrc);
  const arrayBuffer = await response.arrayBuffer();
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  return audioBuffer;
};

const Pad = ({
  step,
  sound,
  signature,
}: {
  step: number;
  sound: AudioBuffer | null;
  signature: Signature;
}) => {
  const [active, setActive] = useState<boolean>(false);

  useScheduleSound(signature, ({ beat, time, context }) => {
    if (active && sound && step === beat) {
      const source = context.createBufferSource();
      source.buffer = sound;
      source.connect(context.destination);
      source.start(time);
    }
  });

  return (
    <div
      onClick={() => setActive((prev) => !prev)}
      className={classNames('p-3 flex-1 max-w-4', {
        'bg-indigo-500': active,
        'bg-slate-100': !active,
      })}></div>
  );
};

const Row = ({
  signature,
  audioSrc,
  text,
  length,
}: {
  signature: Signature;
  audioSrc: string;
  text: string;
  length: number;
}) => {
  const [sound, setSound] = useState<AudioBuffer | null>(null);
  useEffect(() => {
    fetchSound(audioSrc).then((data) => {
      setSound(data);
    });
  }, [audioSrc]);
  return (
    <div className="flex flex-row gap-2 mb-4 items-center border-2 border-zinc-500 p-4">
      <h3 className="w-16">{text}</h3>
      {Array.from({ length }).map((_, i) => (
        <Pad key={`${signature}_${i}`} step={i} sound={sound} signature={signature} />
      ))}
    </div>
  );
};

const getArrayLength = (signature: Signature) => {
  switch (signature) {
    case 'eights':
      return 8;
    case 'sixteenths':
      return 16;
    case 'quarter':
    default:
      return 4;
  }
};

const Sequencer = () => {
  const [currentBeat, setCurrentBeat] = useState<number>(1);
  const [signature, setSignature] = useState<Signature>('sixteenths');

  useScheduleSound(signature, ({ beat }) => {
    console.log(beat);
    setCurrentBeat(beat);
  });

  return (
    <div draggable="true" className="p-8 max-w-screen-md">
      <h2>Sequencer</h2>
      <section className="bg-zinc-200 border-2 border-zinc-600 rounded-lg p-8">
        <select
          defaultValue={signature}
          onChange={(e) => setSignature(e.target.value as Signature)}
          className="block py-2.5 px-0 mb-4 w-1/3 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-400 peer">
          <option value="quarter">Quarter</option>
          <option value="eights">Eights</option>
          <option value="sixteenths">Sixteenths</option>
        </select>
        <div />

        <div className="flex flex-row gap-2 mb-4 items-center border-2 border-zinc-500 p-4">
          <h3 className="w-16"></h3>
          {Array.from({ length: getArrayLength(signature) }).map((_, i) => (
            <div
              key={`${signature}_${i}_beat`}
              className={classNames('p-3 w-2 rounded-full', {
                'bg-orange-500': currentBeat === i,
                'bg-slate-100': currentBeat !== i,
              })}
            />
          ))}
        </div>
        <Row
          length={getArrayLength(signature)}
          signature={signature}
          audioSrc="/audio/RDM_Analog_SY1-Kick01.wav"
          text="Kick"
        />
        <Row
          length={getArrayLength(signature)}
          signature={signature}
          audioSrc="/audio/RDM_Analog_SY1-Snr01.wav"
          text="Snare"
        />
        <Row
          length={getArrayLength(signature)}
          signature={signature}
          audioSrc="/audio/RDM_Analog_SY1-ClHat.wav"
          text="Cl HH"
        />
        <Row
          length={getArrayLength(signature)}
          signature={signature}
          audioSrc="/audio/RDM_Analog_MT40-Clave.wav"
          text="Clave"
        />
      </section>
    </div>
  );
};

export default Sequencer;
