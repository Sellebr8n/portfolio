'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type BaseProps = {
  children: React.ReactNode;
};

const Context = createContext<AudioContext | null>(null);

export const useAudioContext = () => {
  const audioCtx = useContext(Context);
  return audioCtx;
};

const AudioContextProvider: React.FC<BaseProps> = ({ children }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    window.AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new window.AudioContext();

    setAudioContext(audioContext);
  }, []);


  return <Context.Provider value={audioContext}>{children}</Context.Provider>;
};

export default AudioContextProvider;
