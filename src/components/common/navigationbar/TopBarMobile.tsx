import type { DefinedUserRole, navigationOptions } from '@src/types';
import type { FC } from 'react';
import {
  adminNavigationOptions,
  customerNavigationOptions,
  vendorNavigationOptions,
} from '@src/utils/constantJSX';
import { signOut, useSession } from 'next-auth/react';
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
        <Link href={navOptions[0]?.url || '/'} title='Home'>
          <Image
            className={`w-12 rounded-full border-[2px] border-bord/50 dark:border-transparent  ${
              userAvatar === '/defaults/defaultAvatar.png' ? 'dark:invert' : ''
            } `}
            src={userAvatar}
            height={100}
            priority
            width={100}
            alt='Avatar'></Image>
        </Link>
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
          className='absolute top-0 left-0 z-10 h-screen w-screen bg-black/50 backdrop-blur-[3px] dark:bg-white/20'
          onClick={() => {
            setShowMenu(false);
          }}></div>
      )}
      {showMenu && (
        <nav className='absolute top-0 right-0 z-20 h-screen w-10/12 overflow-auto bg-white dark:bg-black'>
          <div className='absolute h-36 w-full'>
            <Image
              src={session?.user.image || '/defaults/defaultAvatar.png'}
              priority
              fill
              alt='Image'
              className='object-cover brightness-75'></Image>
          </div>

          <div className='flex'>
            <span className='pt-2 pl-2 invert dark:invert-0'>
              <ThemePicker></ThemePicker>
            </span>
            <span className='z-20 flex h-full w-full  flex-grow items-center justify-end pt-2 pr-2'>
              <button onClick={() => setShowMenu(false)}>
                <IoMdClose className='text-4xl text-main'></IoMdClose>
              </button>
            </span>
          </div>

          <div className='relative mt-7 flex justify-center'>
            <p className='font-poppins text-lg text-white'>
              Hi, <span className='text-2xl'>{session?.user.name}!</span>
            </p>
          </div>
          <div className='relative mt-9'>
            {navOptions.map((eachOption, index) => {
              return (
                <Link
                  href={eachOption.url}
                  title={eachOption.text}
                  className={`flex items-center justify-start gap-3 border-b border-b-black/40 px-6 py-3 dark:border-b-white/30`}
                  key={index}>
                  <span className='text-2xl text-black dark:text-white'>
                    {eachOption.iconActive}
                  </span>
                  <span className='text-xl text-black dark:text-white'>
                    {eachOption.text}
                  </span>
                </Link>
              );
            })}
          </div>
          <div className='mt-7 flex justify-center'>
            <button onClick={() => signOut()} className='btn mx- w-fit px-2'>
              Sign out
            </button>
          </div>
        </nav>
      )}
    </>
  );
};

export default CustomerTopBarMobile;
