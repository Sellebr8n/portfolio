'use client';

import classNames from 'classnames';
import { useCallback, useEffect, useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6';
import NeonHeader from './components/NeonHeader';
import { VT323 } from 'next/font/google';

export const vt323 = VT323({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-press-start-2p',
});

const Pressable = ({
  active,
  onClick,
  children,
  width = 55,
  height = 50,
}: {
  active: boolean;
  onClick: () => void;
  children?: React.ReactNode;
  width?: number;
  height?: number;
}) => {
  return (
    <div
      onClick={onClick}
      style={{ width, height }}
      className={classNames(
        'text p-6 button rounded-lg cursor-pointer select-none flex items-center justify-center',
        'active:translate-y-2 active:border-b-[0px]',
        'transition-all duration-150 text-white',
        'box-shadow:_inset_0_10px_0_0_#ddd7dc,0_15px_0_0_#29041541',
        {
          'bg-slate-900 border-b-[1px] border-slate-700 text-slate-800': !active,
          '[box-shadow:0_10px_0_0_#11050e,0_15px_0_0_#29041541]': !active,
          'active:[box-shadow:0_0px_0_0_#290326,0_0px_0_0_#1d042041]': !active,
          'bg-pink-500 border-b-[1px] border-pink-400 text-pink-200 inset-10': active,
          '[box-shadow:0_10px_0_0_#eb18a1,0_15px_0_0_#f81b7f41]': active,
          'active:[box-shadow:0_0px_0_0_#f81be6,0_0px_0_0_#e61bf841]': active,
        }
      )}>
      {children}
    </div>
  );
};

enum Difficulty {
  Easy = 1,
  Medium = 2,
  Hard = 3,
}

const settings = {
  rows: 5,
  cols: 5,
  lights: [
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
    [false, false, false, false, false],
  ],
};

const generateBoard = (grid: number, difficulty: number) => {
  const board = [];
  for (let i = 0; i < grid; i++) {
    const row = [];
    for (let j = 0; j < grid; j++) {
      Math.random() > mapDifficulty(difficulty).level ? row.push(true) : row.push(false);
    }
    board.push(row);
  }
  return board;
};

const readableTime = (timePassed: number) =>
  new Date(timePassed)
    .toISOString()
    .match(/\d{2}:\d{2}:\d{2}/)
    ?.join();

const mapDifficulty = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Medium:
      return { name: 'Medium', level: 0.7 };
    case Difficulty.Hard:
      return { name: 'Hard', level: 0.4 };
    case Difficulty.Easy:
    default:
      return { name: 'Easy', level: 0.8 };
  }
};

const useGameClock = () => {
  const [timePassed, setTimePassed] = useState(0);
  const [gameRunning, setGameRunning] = useState(false);

  useEffect(() => {
    if (!gameRunning) return;
    const interval = setInterval(() => {
      setTimePassed((pre) => pre + 1000);
    }, 1000);
    return () => clearInterval(interval);
  }, [gameRunning]);

  return { timePassed: readableTime(timePassed), gameRunning, setGameRunning };
};

export default function Main() {
  const { timePassed, gameRunning, setGameRunning } = useGameClock();

  const [difficulty, setDifficulty] = useState(Difficulty.Easy);
  const [numClicks, setNumClicks] = useState(0);
  const [lights, setLights] = useState(settings.lights);

  const increaseDifficulty = useCallback(() => {
    setDifficulty((pre) => {
      if (pre === 3) return 1;
      return pre + 1;
    });
  }, []);

  const decreaseDifficulty = useCallback(() => {
    setDifficulty((pre) => {
      if (pre === 1) return 3;
      return pre - 1;
    });
  }, []);

  const toggleLight = useCallback(
    (i: number, j: number) => {
      if (!gameRunning) return;
      setLights((lights) =>
        lights.map((row, rowIdx) =>
          row.map((active, colIdx) => {
            if (i === rowIdx && j === colIdx) return !active;
            if (i === rowIdx - 1 && j === colIdx) return !active;
            if (i === rowIdx + 1 && j === colIdx) return !active;
            if (i === rowIdx && j === colIdx - 1) return !active;
            if (i === rowIdx && j === colIdx + 1) return !active;
            return active;
          })
        )
      );
      gameRunning && setNumClicks((pre) => pre + 1);
    },
    [gameRunning]
  );

  return (
    <main
      className={classNames(
        `${vt323.className}`,
        'text-sm',
        'flex flex-col items-center min-h-screen p-4 text-center bg-gradient-to-r from-zinc-900 to-slate-900'
      )}>
      <NeonHeader />
      <div
        className={classNames(
          'rounded-md bg-slate-600 border-b-[2px] border-slate-700 [box-shadow:0_25px_0_0_#312a2f,0_30px_0_0_#29041541]'
        )}>
        <div className="flex mb-2 items-center">
          <div className={classNames('flex gap-2 justify-start ml-4 pt-4 mb-2 -translate-y-2')}>
            <Pressable
              width={70}
              height={35}
              onClick={() => {
                setGameRunning(true);
                setNumClicks(0);
                setLights(generateBoard(settings.rows, difficulty));
              }}
              active={!gameRunning}>
              {!gameRunning ? 'Start' : 'Stop'}
            </Pressable>
            <Pressable
              width={70}
              height={35}
              onClick={() => {
                setGameRunning(false);
                setNumClicks(0);
              }}
              active={gameRunning}>
              Reset
            </Pressable>
            <Pressable
              width={70}
              height={35}
              onClick={() => {
                setGameRunning((pre) => !pre);
              }}
              active={gameRunning}>
              {gameRunning ? 'Pause' : 'Resume'}
            </Pressable>
          </div>
          <div
            className={classNames(
              'flex flex-col',
              'text-left p-2 rounded-md',
              '[box-shadow:inset_0_1px_5px_0_#2b3800,0_1px_0_0_#b5b3b441]',
              'ml-auto mr-2 my-2 w-1/3 bg-zinc-900 text-emerald-800'
            )}>
            <div className="flex items-center">
              <span className="">Difficulty:</span>
              <div className="flex items-center justify-between w-full">
                <div className="ml-1">{mapDifficulty(difficulty).name}</div>
                <div className="flex flex-col">
                  <FaChevronUp onClick={increaseDifficulty} className="h-3 w-3 cursor-pointer" />
                  <FaChevronDown onClick={decreaseDifficulty} className="h-3 w-3 cursor-pointer" />
                </div>
              </div>
            </div>
            <div>Time: {timePassed}</div>
            <div>Clicks: {numClicks}</div>
          </div>
        </div>
        <div className="grid grid-cols-5 grid-rows-5 gap-6 p-4 -translate-y-2">
          {lights.map((row, rowIdx) =>
            row.map((active, colIdx) => (
              <Pressable
                key={`${rowIdx}-${colIdx}`}
                active={active}
                onClick={() => toggleLight(rowIdx, colIdx)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
}
