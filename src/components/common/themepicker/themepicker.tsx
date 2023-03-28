import { getCurrentThemeMode } from '@src/utils/clientSideUtilFunctions';
import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemePicker: FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'DARK' | 'LIGHT'>('DARK');
  useEffect(() => {
    if (getCurrentThemeMode() === 'dark') {
      document.documentElement.classList.add('dark');
      setCurrentTheme('DARK');
    } else {
      document.documentElement.classList.remove('dark');
      setCurrentTheme('LIGHT');
    }
  }, []);

  return (
    <>
      {currentTheme === 'LIGHT' && (
        <button
          title='Change theme'
          className='w-fit text-black dark:text-main'
          onClick={() => {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
            setCurrentTheme('DARK');
          }}>
          <BsSunFill className='text-2xl sm:text-xl'></BsSunFill>
        </button>
      )}
      {currentTheme === 'DARK' && (
        <button
          title='Change theme'
          className='w-fit text-black dark:text-main'
          onClick={() => {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
            setCurrentTheme('LIGHT');
          }}>
          <BsFillMoonFill className='text-2xl sm:text-base'></BsFillMoonFill>
        </button>
      )}
    </>
  );
};

export default ThemePicker;
