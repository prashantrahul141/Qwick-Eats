import LoadingSpinner from '@src/components/common/loadingSpinner';
import AdditionalInfoForm from '@src/components/forms/signin/additionalinfo/additionalInfo';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignInNew: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return (
      <>
        <LoadingSpinner></LoadingSpinner>
      </>
    );
  }

  if (status === 'unauthenticated') {
    void router.push('/signin');
  }

  if (status === 'authenticated') {
    switch (session.user.role) {
      case 'NOTDEFINED':
        return (
          <div className='px-2'>
            <AdditionalInfoForm></AdditionalInfoForm>
          </div>
        );
      case 'CUSTOMER':
        void router.push('/order');
        break;

      case 'VENDOR':
        void router.push('/sell');
        break;

      case 'ADMIN':
        void router.push('/dashboard');
        break;
    }

    return <></>;
  }

  return <></>;
};

export default SignInNew;
