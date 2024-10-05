import classNames from 'classnames';
import { Tilt_Neon } from 'next/font/google';

export const tilt_neon = Tilt_Neon({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-tilt-neon',
});

export default function NeonHeader() {
  return (
    <div className={classNames('relative m-4 w-full h-16 flex justify-center')}>
      <h1
        className={classNames(
          `${tilt_neon.className}`,
          'absolute text-6xl font-bold',
          '[text-shadow:_0px_0px_20px_#e21a8b,_0px_0px_15px_#f3bede]',
          'text-[#f8d0e2] mb-8'
        )}>
        Lights Out
      </h1>
      <h1
        className={classNames(
          `${tilt_neon.className}`,
          'animate-pulse absolute text-6xl font-bold',
          '[text-shadow:_0px_0px_20px_#e21a8b,_0px_0px_15px_#f3bede]',
          'text-[#f8d0e2] mb-8'
        )}>
        Lights Out
      </h1>
    </div>
  );
}
