import type { FC } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';

const InfoAlertBox: FC<{
  callbackFnOnClose: () => void;
  title: string;
  desc: string;
}> = ({ callbackFnOnClose, title, desc }) => {
  return (
    <>
      <div
        className='fixed top-0 left-0 h-screen w-screen bg-black opacity-50'
        onClick={callbackFnOnClose}></div>
      <div
        role='alert'
        className='fixed top-1/2 left-1/2 h-max w-full max-w-lg -translate-x-1/2 rounded-md border bg-main py-4 dark:border-zinc-800 dark:bg-bg'>
        <div className='flex items-center justify-center px-4 pb-4'>
          <p className='flex-grow text-center font-sans text-lg font-bold tracking-wide text-bord dark:text-gray-200'>
            {title}
          </p>
          <button
            onClick={callbackFnOnClose}
            className='text-bord dark:text-main'>
            <AiFillCloseCircle size={18}></AiFillCloseCircle>
          </button>
        </div>
        <div className=''>
          <p className='text-center text-black dark:text-muted'>{desc}</p>
        </div>
      </div>
    </>
  );
};
export default InfoAlertBox;
