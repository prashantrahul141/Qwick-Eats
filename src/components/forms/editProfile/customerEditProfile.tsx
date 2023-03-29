import { useSession } from 'next-auth/react';
import type { SubmitHandler } from 'react-hook-form';
import type { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import ProfileImageUploader from '@src/components/common/profileImageUploader';

interface FormInputs {
  image: string;
  name: string;
}

const CustomerEditProfileForm: FC = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<FormInputs>({ mode: 'all' });
  const [showImageUploader, setShowImageUploader] = useState(false);
  const onSubmitHandler: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='mt-5 flex flex-col items-center gap-5'>
      <Image
        priority
        src={session?.user.image || '/defaults/defaultAvatar.png'}
        width={200}
        height={200}
        alt='Avatar'
        title='Upload new profile photo'
        className='w-28 cursor-pointer rounded-full hover:brightness-95'
        onClick={() => setShowImageUploader(true)}></Image>

      <input
        className='input max-w-md'
        defaultValue={session?.user.name || ''}
        {...register('name', {
          required: { message: 'Without a name?', value: true },
          minLength: {
            value: 2,
            message: 'Cannot be shorter than 2 characters.',
          },
          maxLength: {
            value: 50,
            message: 'Cannot be longer than 50 characters.',
          },
        })}></input>

      {showImageUploader && (
        <div
          onClick={() => setShowImageUploader(false)}
          className='absolute top-0 left-0 h-screen w-screen bg-black/20 backdrop-blur-sm dark:bg-bord/20 sm:bg-black/60 sm:backdrop-blur-0 sm:dark:bg-bord/80'></div>
      )}
      {showImageUploader && (
        <ProfileImageUploader
          closeUploaderCallback={() => {
            setShowImageUploader(false);
          }}></ProfileImageUploader>
      )}
    </form>
  );
};
export default CustomerEditProfileForm;
