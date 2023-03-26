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
    switch (session.user.role) {
      case 'VENDOR':
        void router.push('/sell');
        break;
      case 'ADMIN':
        void router.push('/dashboard');
        break;
      case 'NOTDEFINED':
        void router.push('/signin/new');
        break;
    }

    if (session.user.role === 'CUSTOMER') {
      return <>{children}</>;
    }
  }
  return <LoadingSpinner></LoadingSpinner>;
};

export default CustomerOnlyGuard;
