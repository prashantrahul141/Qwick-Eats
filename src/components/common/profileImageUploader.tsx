import type { FC, ChangeEvent } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';

const ProfileImageUploader: FC<{ closeUploaderCallback: () => void }> = ({
  closeUploaderCallback,
}) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [chooseImage, setChooseImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageObjURL, setSelectedImageObjURL] = useState('');

  const onSelectedImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files[0]) {
      setChooseImage(true);
      setSelectedImage(files[0]);
      setSelectedImageObjURL(URL.createObjectURL(files[0]));
    }
  };

  return (
    <div className='absolute top-1/2 left-1/2 z-10 h-max w-full max-w-sm -translate-y-1/2 -translate-x-1/2 justify-center rounded-md border border-black/40 bg-white px-2 py-2 dark:border-bord dark:bg-bg'>
      <div className='flex h-8 w-full justify-end'>
        <button className='h-fit p-1' onClick={closeUploaderCallback}>
          <AiFillCloseCircle
            className='text-gray-700 dark:text-main/90'
            size={18}></AiFillCloseCircle>
        </button>
      </div>

      <div className='mx-auto w-fit'>
        {chooseImage && (
          <div className='relative'>
            <img
              src={selectedImageObjURL}
              alt='New Image'
              className='max-h-80 rounded-md'></img>
            <button
              className='absolute top-2 right-2 rounded-md p-1 text-red-400 hover:bg-red-500 hover:text-white dark:text-white'
              onClick={() => {
                setChooseImage(false);
                setSelectedImage(null);
                setSelectedImageObjURL('');
              }}>
              <MdDeleteForever size={20}></MdDeleteForever>
            </button>
            <button className='btn my-4'>Upload</button>
          </div>
        )}
        {!chooseImage && (
          <div
            onClick={() => {
              imageInputRef.current?.click();
            }}
            className='mb-2 flex h-36 w-36 cursor-pointer select-none items-center justify-center rounded-full border border-dashed border-black dark:border-main'>
            <span className='text-black dark:text-white'>Choose Image</span>
          </div>
        )}
        {!chooseImage && (
          <input
            onChange={(e) => {
              onSelectedImageChange(e);
            }}
            type={'file'}
            ref={imageInputRef}
            accept='image/png, image/jpeg'
            className='absolute -top-96 -left-96'></input>
        )}
      </div>
    </div>
  );
};

export default ProfileImageUploader;
