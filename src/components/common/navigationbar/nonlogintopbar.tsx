import type { FC } from 'react';
import ThemePicker from '@components/common/themepicker/themepicker';
import Link from 'next/link';
import Icon from '../icon';

const NonLoginTopBar: FC = () => {
  return (
    <nav className='flex h-16 w-full flex-col items-center border-b border-b-muted bg-bg-white dark:border-b-bord dark:bg-black sm:h-14'>
      <div className='relative flex h-full w-full max-w-4xl items-center'>
        <Link
          href='/'
          className='absolute left-4 h-16 w-16 text-black dark:text-main sm:h-14 sm:w-14'>
          <Icon></Icon>
        </Link>
        <div className='absolute right-3 flex items-center justify-center gap-4 sm:gap-2'>
          <Link
            href={'/signin'}
            className='text-gray-600 hover:text-black dark:text-muted dark:hover:text-main'>
            Sign in
          </Link>
          <div className='h-5'>
            <ThemePicker></ThemePicker>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NonLoginTopBar;
