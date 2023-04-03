import { useSession } from 'next-auth/react';
import type { SubmitHandler } from 'react-hook-form';
import type { FC } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import ProfileImageUploader from '@src/components/common/profileImageUploader';
import { api } from '@src/utils/api';
import { reloadSession } from '@src/utils/clientSideUtilFunctions';

interface FormInputs {
  companyName: string;
  address: string;
  phoneNumber: string;
}

const VendorEditProfileForm: FC = () => {
  const { data: session } = useSession();
  const { register, handleSubmit } = useForm<FormInputs>({
    mode: 'all',
    defaultValues: {
      companyName: session?.user.companyName,
      phoneNumber: session?.user.phoneNumber,
      address: session?.user.address,
    },
  });
  const [showImageUploader, setShowImageUploader] = useState(false);
  const updateProfileMutation =
    api.updateProfile.updateVendorInfo.useMutation();

  const onSubmitHandler: SubmitHandler<FormInputs> = async (data) => {
    await updateProfileMutation.mutateAsync(data);
    reloadSession();
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
        className='h-28 w-28 cursor-pointer rounded-full object-cover hover:brightness-95'
        onClick={() => setShowImageUploader(true)}></Image>

      <input
        className='input max-w-md'
        placeholder='Company Name'
        {...register('companyName', {
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

      <input
        type={'number'}
        className='input max-w-md resize-none pt-2'
        {...register('phoneNumber', {
          pattern: {
            message: 'Invalid Phone number.',
            value: /[0-9]/,
          },
          required: {
            value: true,
            message: 'Cannot submit without phone number.',
          },
          minLength: {
            message: 'Cannot be shorter than 10 characters.',
            value: 10,
          },
          maxLength: {
            message: 'Cannot be longer than 10 characters.',
            value: 10,
          },
        })}
        placeholder={'1234567890'}></input>

      <textarea
        placeholder='Address'
        className='input max-w-md'
        {...register('address', {
          required: {
            value: true,
            message: 'Cannot submit without address.',
          },
          minLength: {
            message: 'Cannot be shorter than 10 characters.',
            value: 11,
          },
        })}
      />

      <div className='flex w-full max-w-md justify-end'>
        <button className='btn w-fit px-2'>Update Profile</button>
      </div>
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
export default VendorEditProfileForm;
