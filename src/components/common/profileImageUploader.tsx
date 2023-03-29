import { api } from '@src/utils/api';
import type { FC, ChangeEvent } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';
import { env } from '@src/env.mjs';
import type { AxiosProgressEvent } from 'axios';
import LoadingSpinner from './loadingSpinner';
import { cloudinaryRequiredFieldsSchema } from '@src/utils/constants';
import { reloadSession } from '@src/utils/clientSideUtilFunctions';

const ProfileImageUploader: FC<{
  closeUploaderCallback: () => void;
}> = ({ closeUploaderCallback }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [chooseImage, setChooseImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedImageObjURL, setSelectedImageObjURL] = useState('');
  const [uploadProgress, setUploadProgress] = useState<null | number>(null);
  const getSignatureQuery = api.utils.getCloudinarySignature.useQuery(
    {},
    { enabled: false }
  );
  const updateProfilePictureMutation =
    api.updateProfile.updateProfilePicture.useMutation();

  const updateProfilePicture = async () => {
    if (chooseImage && selectedImage && uploadProgress === null) {
      const signatureData = (await getSignatureQuery.refetch()).data;
      if (signatureData) {
        const formData = new FormData();
        formData.append('file', selectedImage);
        formData.append('api_key', env.NEXT_PUBLIC_TOKEN_CLOUDINARY_API_KEY);
        formData.append('signature', signatureData.signature);
        formData.append('timestamp', signatureData.timestamp);
        const cloudinaryResponse = await axios.post(
          `${env.NEXT_PUBLIC_CLOUDINARY_ENDPOINT}/${env.NEXT_PUBLIC_TOKEN_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress: (e: AxiosProgressEvent) => {
              if (typeof e.progress === 'number') {
                setUploadProgress(Math.round(e.progress * 100));
              }
            },
          }
        );
        if (cloudinaryResponse.status === 200 && cloudinaryResponse.data) {
          try {
            const safeCloudinaryData = cloudinaryRequiredFieldsSchema.parse(
              cloudinaryResponse.data
            );
            await updateProfilePictureMutation.mutateAsync({
              ...safeCloudinaryData,
            });
            closeUploaderCallback();
            reloadSession();
          } catch (e) {
            console.error(e);
          }
        }
      }
    }
  };

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

      {chooseImage && uploadProgress && (
        <div className='fixed top-0 left-0 z-20 flex h-full w-full flex-col items-center justify-center backdrop-brightness-50'>
          <div>
            <LoadingSpinner></LoadingSpinner>
          </div>
          <span className='text-white'>{uploadProgress}%</span>
        </div>
      )}

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

            <button
              className='btn my-4'
              onClick={async (e) => {
                e.currentTarget.disabled = true;
                await updateProfilePicture();
              }}>
              Update Profile Picture
            </button>
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
