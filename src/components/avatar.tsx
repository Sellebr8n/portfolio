'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

type Props = {
  width: number;
  height: number;
  src: string;
};

export const Sprite = ({ src, width, height }: Props) => {
  return <Image width={width} height={height} src={src} alt="an 8bit representation of ludde" />;
};

export const Avatar = ({ src }: Props) => {
  return (
    <div className={cn(`relative bg-primary rounded-full overflow-clip w-[300px] h-[300px]`)}>
      <Image
        priority
        width={300}
        height={300}
        className="absolute top-6 left-4"
        src={src}
        alt="an 8bit representation of ludde"
      />
    </div>
  );
};
