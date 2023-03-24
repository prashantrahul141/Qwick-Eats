import NonLoginTopBar from '@src/components/common/navigationbar/nonlogintopbar';
import SignInForm from '@src/components/forms/signin/signinform';
import type { NextPage } from 'next';
import Link from 'next/link';

const SignIn: NextPage = () => {
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
