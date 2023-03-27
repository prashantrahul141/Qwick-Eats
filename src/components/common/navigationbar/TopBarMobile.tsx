import type { DefinedUserRole, navigationOptions } from '@src/types';
import type { FC } from 'react';
import {
  adminNavigationOptions,
  customerNavigationOptions,
  vendorNavigationOptions,
} from '@src/utils/constantJSX';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import ThemePicker from '../themepicker/themepicker';
import { IoMdClose } from 'react-icons/io';
import Link from 'next/link';

const CustomerTopBarMobile: FC<{ type: DefinedUserRole }> = ({ type }) => {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const userAvatar = session?.user.image || '/defaults/defaultAvatar.png';

  let navOptions: navigationOptions = [];
  switch (type) {
    case 'CUSTOMER':
      navOptions = customerNavigationOptions;
      break;
    case 'VENDOR':
      navOptions = vendorNavigationOptions;
      break;
    case 'ADMIN':
      navOptions = adminNavigationOptions;
      break;
  }

  return (
    <>
      <nav className='relative flex h-16 w-full items-center border-b border-b-bord/40 bg-white px-2 dark:bg-black'>
        <Image
          className={`w-12 rounded-full border-[2px] border-bord/50 dark:border-transparent  ${
            userAvatar === '/defaults/defaultAvatar.png' ? 'dark:invert' : ''
          } `}
          src={userAvatar}
          height={100}
          width={100}
          alt='Avatar'></Image>
        <button
          className='rounded-mb absolute right-3 h-12 w-12'
          onClick={() => setShowMenu(true)}>
          <div className='absolute right-0 top-2 w-12 rounded-full border-b-4 border-b-bord/75 dark:border-b-main'></div>
          <div className='absolute right-0 top-5 w-9 rounded-full border-b-4 border-b-bord/75 dark:border-b-main'></div>
          <div className='absolute right-0 top-8 w-6 rounded-full border-b-4 border-b-bord/75 dark:border-b-main'></div>
        </button>
      </nav>
      {showMenu && (
        <div
          className='absolute top-0 left-0 z-10 h-screen w-screen bg-black/50 backdrop-blur-sm dark:bg-white/20'
          onClick={() => {
            setShowMenu(false);
          }}></div>
      )}
      {showMenu && (
        <nav className='absolute top-0 right-0 z-20 h-screen w-10/12 overflow-auto bg-white dark:bg-black'>
          <div className='relative top-4 flex w-full px-4'>
            <span>
              <ThemePicker></ThemePicker>
            </span>
            <span className='flex h-full w-full flex-grow items-center justify-end'>
              <button onClick={() => setShowMenu(false)}>
                <IoMdClose className='text-4xl dark:text-main'></IoMdClose>
              </button>
            </span>
          </div>
          <div className='relative mt-8 flex justify-center'>
            <p className='font-poppins text-lg text-black dark:text-gray-300'>
              Hi,{' '}
              <span className='text-2xl text-black dark:text-white '>
                {session?.user.name}!
              </span>
            </p>
          </div>
          <div className='relative mt-8'>
            {navOptions.map((eachOption, index) => {
              return (
                <Link
                  href={eachOption.url}
                  title={eachOption.text}
                  className={`flex items-center justify-start gap-3 border-b border-b-black/40 px-6 py-3 dark:border-b-white/30 ${
                    index === 0
                      ? 'border-t border-t-black/40 dark:border-t-white/30'
                      : ''
                  }`}
                  key={index}>
                  <span className='text-2xl text-black dark:text-white'>
                    {eachOption.iconActive}
                  </span>
                  <span className='text-2xl text-black dark:text-white'>
                    {eachOption.text}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </>
  );
};

export default CustomerTopBarMobile;
