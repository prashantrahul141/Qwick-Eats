import InfoHoverIcon from '@src/components/common/infoHoverIcon';
import { api } from '@src/utils/api';
import { randomAddress } from '@src/utils/constants';
import { useRouter } from 'next/router';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

type FormInputs = {
  addr: string;
  phoneNumber: string;
};

const AdditionalInfoCustomerForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ mode: 'all' });
  const router = useRouter();
  const accountSetupMutation = api.accountSetup.setupCustomer.useMutation();

  const submitCustomerForm: SubmitHandler<FormInputs> = async (data) => {
    await accountSetupMutation.mutateAsync({
      ...data,
    });

    void router.push('/order');
  };

  return (
    <form
      className='w-full max-w-xl'
      onSubmit={handleSubmit(submitCustomerForm)}>
      <fieldset className='group relative mb-6 w-full max-w-xl'>
        <label className='absolute -top-[.68rem] left-4 flex select-none items-center gap-2 bg-white text-sm text-gray-700 dark:bg-bg dark:text-gray-300'>
          <span>Full Address</span>{' '}
          <InfoHoverIcon infoText='Your address will be shown only to the places you order from.'></InfoHoverIcon>
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
        <label className='absolute -top-[.68rem] left-4 flex select-none items-center gap-2 bg-white text-sm text-gray-700 dark:bg-bg dark:text-gray-300'>
          <span>Phone number</span>
          <InfoHoverIcon infoText='Your phone number will be shown only to the places you order from.'></InfoHoverIcon>
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
          disabled={accountSetupMutation.isLoading}
          type='submit'
          className='btn absolute right-1 w-fit py-[.4rem] px-2'>
          Start Ordering
        </button>
      </div>
    </form>
  );
};

export default AdditionalInfoCustomerForm;
