import AdditionalInfoForm from '@src/components/forms/signin/additionalinfo/additionalInfo';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const SignInNew: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    void router.push('/');
  } else if (status === 'authenticated') {
    if (session.user.role === 'NOTDEFINED') {
      return (
        <div className='px-2'>
          <AdditionalInfoForm></AdditionalInfoForm>
        </div>
      );
    } else {
      void router.push('/');
    }
  }

  return <></>;
};

export default SignInNew;
