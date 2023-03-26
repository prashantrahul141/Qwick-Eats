import LoadingSpinner from '@src/components/common/loadingSpinner';
import NonLoginTopBar from '@src/components/common/navigationbar/nonLoginTopBar';
import SignInForm from '@src/components/forms/signin/signInForm';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SignIn: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return <LoadingSpinner></LoadingSpinner>;
  }

  if (status === 'authenticated') {
    switch (session.user.role) {
      case 'CUSTOMER':
        void router.push('/order');
        break;
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
  }

  return (
    <div className=''>
      <NonLoginTopBar></NonLoginTopBar>
      <div className='mt-36 flex flex-col items-center gap-12 sm:mt-16'>
        <section>
          <p className='font-poppins text-4xl text-black dark:text-main'>
            Sign In
          </p>
        </section>
        <section>
          <SignInForm></SignInForm>
        </section>
        <section>
          <p className='text-black dark:text-gray-400'>
            having problems?&nbsp;
            <Link
              href={'/help'}
              className='text-blue-600 underline-offset-2 hover:text-blue-500/90 hover:underline dark:text-blue-400/90'>
              contact us.
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
};

export default SignIn;
