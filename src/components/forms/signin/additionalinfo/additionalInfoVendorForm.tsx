import { randomAddress } from '@src/utils/constants';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type FormInputs = {
  companyName: string;
  addr: string;
  phoneNumber: number;
};

const AdditionalInfoVendorForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'all' });

  const submitVendorForm: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
  };

  return (
    <form className='w-full max-w-xl' onSubmit={handleSubmit(submitVendorForm)}>
      <fieldset className='group relative mb-6 w-full max-w-xl'>
        <label className='absolute -top-[.68rem] left-4 select-none bg-white text-sm text-gray-700 dark:bg-bg dark:text-gray-300'>
          <span>Company Name</span>
        </label>
        <input
          type={'text'}
          className='input resize-none pt-2'
          {...register('companyName', {
            required: {
              value: true,
              message: 'Cannot submit without company name.',
            },
            minLength: {
              message: 'Cannot be shorter than 2 characters.',
              value: 2,
            },
            maxLength: {
              message: 'Cannot be longer than 50 characters.',
              value: 50,
            },
          })}
          placeholder={'MacDezz'}></input>
        {errors.companyName && (
          <span className='text-[#ff0f0f] dark:text-red-500'>
            {errors.companyName.message}
          </span>
        )}
      </fieldset>
      <fieldset className='group relative mb-6 w-full max-w-xl'>
        <label className='absolute -top-[.68rem] left-4 select-none bg-white text-sm text-gray-700 dark:bg-bg dark:text-gray-300'>
          <span>Full Address</span>
        </label>
        <textarea
          className='input resize-none pt-2'
          {...register('addr', {
            required: {
              value: true,
              message: 'Cannot submit without address.',
            },
            minLength: {
              message: 'Cannot be shorter than 10 characters.',
              value: 11,
            },
          })}
          placeholder={
            randomAddress[Math.floor(Math.random() * randomAddress.length)]
          }></textarea>
        {errors.addr && (
          <span className='text-[#ff0f0f] dark:text-red-500'>
            {errors.addr.message}
          </span>
        )}
      </fieldset>
      <fieldset className='group relative mb-6 w-full max-w-xl'>
        <label className='absolute -top-[.68rem] left-4 select-none bg-white text-sm text-gray-700 dark:bg-bg dark:text-gray-300'>
          <span>Phone number</span>
        </label>
        <input
          type={'number'}
          className='input resize-none pt-2'
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
        {errors.phoneNumber && (
          <span className='text-[#ff0f0f] dark:text-red-500'>
            {errors.phoneNumber.message}
          </span>
        )}
      </fieldset>
      <div className='relative w-full'>
        <button
          type='submit'
          className='btn absolute right-1 w-fit py-[.4rem] px-2'>
          Start Selling
        </button>
      </div>
    </form>
  );
};

export default AdditionalInfoVendorForm;
