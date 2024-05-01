'use client';

import React, { useState, useEffect } from 'react';
import { useAudioContext } from './AudioContext';

type DrumPadProps = {
  name: string;
  audioSrc: string;
};

const DrumPad: React.FC<DrumPadProps> = ({ name, audioSrc }) => {
  const { audioContext } = useAudioContext();

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
    <button
      type="button"
      className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      onClick={playSound}>
      {name}
    </button>
  );
};

export default DrumPad;
