import Image from 'next/image';
import type { FC } from 'react';

const Icon: FC = () => {
  return (
    <Image
      src={'/icons/android-chrome-192x192.png'}
      alt='Icon'
      fill
      className='object-fill dark:invert'></Image>
  );
};

export default Icon;
