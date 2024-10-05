import { useCallback, useEffect, useState } from 'react';
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

const Knob = ({ size }: { size: number }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 bg-slate-100 rounded-full" />
      <div className="w-1 h-4 bg-slate-100" />
    </div>
  );
}

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
  const [gain, setGain] = useState<number>(0);
  const [pan, setPan] = useState<number>(0);

  useEffect(() => {
    fetchSound(audioSrc).then((data) => {
      setSound(data);
    });
  }, [audioSrc]);
  return (
    <>
      <div className="flex flex-1 flex-col justify-center">
        <div className="flex items-center gap-2">
          <Knob size={10} />
          <label className="flex items-center">
            Gain
            <input
              type="range"
              min="0"
              max="1"
              value={gain}
              onChange={(e) => setGain(parseFloat(e.target.value))}
              step="0.01"
              className="w-16 mr-2"
            />
            {gain}
          </label>
          <input type="checkbox" name="gain" id="gain-active" />
        </div>
        <div className="flex items-center gap-2">
          <label className="flex items-center">
            Pan
            <input
              type="range"
              min="-50"
              max="50"
              value={pan}
              onChange={(e) => setPan(parseInt(e.target.value, 10))}
              step="1"
              className="w-16 mr-2"
            />
            {pan}
          </label>
          <input type="checkbox" name="gain" id="gain-active" />
        </div>
        <h3 className="w-16 px-4">{text}</h3>
      </div>
      <div className="flex flex-row gap-2 mb-4 items-center border-2 border-zinc-500 p-4">
        {Array.from({ length }).map((_, i) => (
          <Pad key={`${signature}_${i}`} step={i + 1} sound={sound} signature={signature} />
        ))}
      </div>
    </>
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
    setCurrentBeat(beat);
  });

  return (
    <div className="p-8 max-w-screen-md min">
      <h2>Sequencer</h2>
      <section className="bg-zinc-200 border-2 border-zinc-600 rounded-lg p-8">
        <div className="text-center">
          beat <span className="w-4">{currentBeat}</span> of{' '}
          {signature === 'sixteenths' ? 16 : signature === 'eights' ? 8 : 4}
        </div>
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
          {Array.from({ length: getArrayLength(signature) }).map((_, i) => (
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
