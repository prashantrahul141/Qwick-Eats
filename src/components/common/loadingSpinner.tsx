import type { FC } from 'react';

const LoadingSpinner: FC = () => {
  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className='h-8 w-8'>
        <div className='h-full w-full animate-spin-ease rounded-full border-[3px] border-gray-200 border-t-bg ease-in-out  dark:border-main/10 dark:border-t-white'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
