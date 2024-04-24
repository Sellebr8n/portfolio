'use client';

import React, { useState, useEffect } from 'react';
import { useAudioContext } from './AudioContext';

type DrumPadProps = {
  name: string;
  audioSrc: string;
};

const DrumPad: React.FC<DrumPadProps> = ({ name, audioSrc }) => {
  const audioContext = useAudioContext();

  const playSound = async () => {
    if (!audioContext) return;

    const response = await fetch(audioSrc);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  };

  return (
    <button className="p-2 m-2 bg-slate-950 rounded-md text-slate-400" onClick={playSound}>
      {name}
    </button>
  );
};

export default DrumPad;
