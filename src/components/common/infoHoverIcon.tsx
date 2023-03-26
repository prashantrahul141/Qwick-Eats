import type { FC } from 'react';
import { useState } from 'react';
import { AiFillQuestionCircle } from 'react-icons/ai';

const InfoHoverIcon: FC<{ infoText: string }> = ({
  infoText = 'Additional Info',
}) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <>
      <button
        className='relative flex w-fit items-center justify-center rounded-full'
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        onClick={() => setShowInfo((prev) => !prev)}>
        <AiFillQuestionCircle className='text-lg'></AiFillQuestionCircle>
        {showInfo && (
          <div className='dark:text-mai absolute bottom-4 w-36 rounded-md bg-bg/90 p-1 text-main backdrop-blur-sm dark:bg-white dark:text-black'>
            {infoText}
          </div>
        )}
      </button>
    </>
  );
};

export default InfoHoverIcon;
