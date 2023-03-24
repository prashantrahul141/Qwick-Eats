import { type AppType } from 'next/app';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

import { api } from '@utils/api';

import '@styles/globals.css';
import { getCurrentThemeMode } from '@src/utils/clientSideUtilFunctions';

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  if (typeof window !== 'undefined') {
    if (getCurrentThemeMode() === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  return (
    <SessionProvider session={session}>
      <div className='h-screen bg-main dark:bg-bg'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
