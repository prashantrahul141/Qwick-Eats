import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import type { FC, ReactNode } from 'react';
import LoadingSpinner from '../common/loadingSpinner';

const CustomerOnlyGuard: FC<{ children: ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (status === 'unauthenticated') {
    void router.push('/signin');
  }

  if (status === 'authenticated' && session) {
    if (session.user.role === 'VENDOR') {
      void router.push('/sell');
    } else if (session.user.role === 'ADMIN') {
      void router.push('/dashboard');
    } else if (session.user.role === 'NOTDEFINED') {
      void router.push('/signin/new');
    }

    if (session.user.role !== 'CUSTOMER') {
      return <></>;
    }

    return <>{children}</>;
  }
  return <LoadingSpinner></LoadingSpinner>;
};

export default CustomerOnlyGuard;
