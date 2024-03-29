import type {
  DefinedUserRole,
  navigationOptions,
  tabOptionsNames,
} from '@src/types';
import type { FC } from 'react';
import {
  adminNavigationOptions,
  customerNavigationOptions,
  vendorNavigationOptions,
} from '@src/utils/constantJSX';
import ThemePicker from '../themepicker/themepicker';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

const TopBarLargeScreen: FC<{
  type: DefinedUserRole;
  activeTab?: tabOptionsNames;
}> = ({ type, activeTab = '' }) => {
  const { data: session } = useSession();
  let navOptions: navigationOptions = [];
  let shownName: string | null | undefined = '';
  let semiBaseUrl = '';
  switch (type) {
    case 'CUSTOMER':
      navOptions = customerNavigationOptions;
      shownName = session?.user.name;
      semiBaseUrl = 'order';
      break;
    case 'VENDOR':
      navOptions = vendorNavigationOptions;
      shownName = session?.user.companyName;
      semiBaseUrl = 'sell';
      break;
    case 'ADMIN':
      navOptions = adminNavigationOptions;
      shownName = session?.user.name;
      semiBaseUrl = 'dashboard';
      break;
  }
  return (
    <nav className='h-26 w-full select-none border-b border-b-gray-400/40 bg-white dark:border-b-bord dark:bg-black'>
      <div className='flex h-16 w-full items-center justify-center px-8'>
        <Link
          href={`/${semiBaseUrl}`}
          className='w-fit text-black dark:text-main'>
          <Image
            priority
            src={'/icons/android-chrome-192x192.png'}
            width={200}
            height={200}
            className='h-fit w-8 dark:invert'
            alt='Icon'></Image>
        </Link>

        <div className='ml-4 flex items-center text-lg'>
          <span className='text-black dark:text-white'>
            Hi, <span className='font-poppins'>{shownName}!</span>
          </span>
        </div>

        <div className='flex flex-grow items-center justify-end'>
          <ThemePicker></ThemePicker>

          <Link href={`/${semiBaseUrl}/profile`}>
            <Image
              priority
              src={session?.user.image || '/defaults/defaultAvatar.png'}
              alt='Avatar'
              width={100}
              height={100}
              className='ml-4 w-8 rounded-full'></Image>
          </Link>
        </div>
      </div>

      <div className='overflow-x-auto overflow-y-hidden'>
        <div className='flex h-9 items-start gap-[.2rem] px-8'>
          {navOptions.map((eachOption, index) => {
            return (
              <Link href={eachOption.url} key={index}>
                <div className='group/tabOption flex flex-col gap-[0.4rem] rounded-md'>
                  <span
                    className={`rounded-md px-3 py-[.1rem] duration-200 ease-in-out hover:bg-black/10 hover:text-black group-hover/tabOption:bg-bord/20 dark:hover:text-white dark:group-hover/tabOption:bg-white/20 ${
                      activeTab === eachOption.text
                        ? 'text-black dark:text-white'
                        : 'text-black/50 dark:text-white/60'
                    }`}>
                    {eachOption.text}
                  </span>
                  {activeTab === eachOption.text && (
                    <span className='rounded-md border-2 border-black/80 dark:border-white'></span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default TopBarLargeScreen;
