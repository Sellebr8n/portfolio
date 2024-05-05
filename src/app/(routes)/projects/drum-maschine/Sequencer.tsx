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

const Pad = ({
  step,
  sound,
  signature,
}: {
  step: number;
  sound: AudioBuffer | null;
  signature: Signatures;
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
  signature: Signatures;
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
        <Pad key={`${signature}_${i}`} step={i + 1} sound={sound} signature={signature} />
      ))}
    </div>
  );
};

type Signatures = 'sixteenths' | 'eights' | 'quarter';

const Sequencer = () => {
  const [currentBeat, setCurrentBeat] = useState<number>(1);
  const [signature, setSignature] = useState<Signatures>('sixteenths');

  useScheduleSound(signature, ({ beat }) => {
    setCurrentBeat(beat);
  });

  let length = 4;
  if (signature === 'eights') {
    length = 8;
  } else if (signature === 'sixteenths') {
    length = 16;
  }

  return (
    <div className="p-8 max-w-screen-md">
      <h2>Sequencer</h2>
      <section className="bg-zinc-200 border-2 border-zinc-600 rounded-lg p-8">
        <select
          defaultValue={signature}
          onChange={(e) => setSignature(e.target.value as Signatures)}
          className="block py-2.5 px-0 mb-4 w-1/3 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-400 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-400 peer">
          <option value="quarter">Quarter</option>
          <option value="eights">Eights</option>
          <option value="sixteenths">Sixteenths</option>
        </select>
        <div />

        <div className="flex flex-row gap-2 mb-4 items-center border-2 border-zinc-500 p-4">
          <h3 className="w-16"></h3>
          {Array.from({ length }).map((_, i) => (
            <div
              key={`${signature}_${i}_beat`}
              className={classNames('p-3 w-2 rounded-full', {
                'bg-orange-500': currentBeat === i + 1,
                'bg-slate-100': currentBeat !== i + 1,
              })}
            />
          ))}
        </div>
        <Row
          length={length}
          signature={signature}
          audioSrc="/audio/RDM_Analog_SY1-Kick01.wav"
          text="Kick"
        />
        <Row
          length={length}
          signature={signature}
          audioSrc="/audio/RDM_Analog_SY1-Snr01.wav"
          text="Snare"
        />
        <Row
          length={length}
          signature={signature}
          audioSrc="/audio/RDM_Analog_SY1-ClHat.wav"
          text="Cl HH"
        />
        <Row
          length={length}
          signature={signature}
          audioSrc="/audio/RDM_Analog_MT40-Clave.wav"
          text="Clave"
        />
      </section>
    </div>
  );
};

export default Sequencer;
