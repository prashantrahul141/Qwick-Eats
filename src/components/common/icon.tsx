import Image from 'next/image';
import type { FC } from 'react';

const Icon: FC = () => {
  return (
    <Image
      priority
      src={'/icons/android-chrome-512x512.png'}
      alt='Icon'
      fill
      className='object-fill dark:invert'></Image>
  );
};

export default Icon;
