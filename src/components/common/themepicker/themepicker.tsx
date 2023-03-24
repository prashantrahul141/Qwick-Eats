import type { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';

const ThemePicker: FC = () => {
  const [currentTheme, setCurrentTheme] = useState<'DARK' | 'LIGHT'>('DARK');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        localStorage.theme === 'dark' ||
        (!('theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add('dark');
        setCurrentTheme('DARK');
      } else {
        document.documentElement.classList.remove('dark');
        setCurrentTheme('LIGHT');
      }
    }
  }, []);

  return (
    <>
      {currentTheme === 'LIGHT' && (
        <button
          title='Theme'
          className='w-fit p-2 text-black dark:text-main'
          onClick={() => {
            localStorage.setItem('theme', 'dark');
            document.documentElement.classList.add('dark');
            setCurrentTheme('DARK');
          }}>
          <BsSunFill></BsSunFill>
        </button>
      )}
      {currentTheme === 'DARK' && (
        <button
          title='Theme'
          className='w-fit p-2 text-black dark:text-main'
          onClick={() => {
            localStorage.setItem('theme', 'light');
            document.documentElement.classList.remove('dark');
            setCurrentTheme('LIGHT');
          }}>
          <BsFillMoonFill></BsFillMoonFill>
        </button>
      )}
    </>
  );
};

export default ThemePicker;
