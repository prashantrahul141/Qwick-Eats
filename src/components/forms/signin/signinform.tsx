import type { FC } from 'react';
import { signIn } from 'next-auth/react';
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai';
import { BsDiscord } from 'react-icons/bs';

const SignInForm: FC = () => {
  return (
    <>
      <main className='flex w-screen max-w-sm flex-col gap-5'>
        <button
          className='btn btn-signin border-none bg-[#24292e] hover:bg-[#3d454d] dark:bg-[#24292e]  dark:hover:bg-[#3d454d]'
          onClick={() => {
            void signIn('github');
          }}>
          <span className='flex items-center justify-center gap-2'>
            <AiFillGithub size={24}></AiFillGithub>
            <span className=''>Continue with Github</span>
          </span>
        </button>
        <button
          className='btn btn-signin border-none bg-[#5865F2] hover:bg-[#717cf4] dark:bg-[#5865F2] dark:hover:bg-[#717cf4]'
          onClick={() => {
            void signIn('discord');
          }}>
          <span className='flex  items-center justify-center gap-2'>
            <BsDiscord size={24}></BsDiscord>
            <span className=''>Continue with Discord</span>
          </span>
        </button>
        <button
          className='btn btn-signin border-none bg-[#D92929] hover:bg-[#e05252] dark:bg-[#D92929] dark:hover:bg-[#e05252]'
          onClick={() => {
            void signIn('google');
          }}>
          <span className='flex  items-center justify-center gap-2'>
            <AiFillGoogleCircle size={24}></AiFillGoogleCircle>
            <span className=''>Continue with Google</span>
          </span>
        </button>
      </main>
    </>
  );
};

export default SignInForm;
