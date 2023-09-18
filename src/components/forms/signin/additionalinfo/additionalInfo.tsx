import ThemePicker from '@src/components/common/themepicker/themepicker';
import type { FC } from 'react';
import { useState } from 'react';
import AdditionalInfoCustomerForm from './additionalInfoCustomerForm';
import AdditionalInfoVendorForm from './additionalInfoVendorForm';

const AdditionalInfoForm: FC = () => {
  const [selectedUserType, setSelectedUserType] = useState<
    'CUSTOMER' | 'VENDOR'
  >('CUSTOMER');

  return (
    <>
      <div className='relative h-24 w-full'>
        <span className='absolute right-2 top-2'>
          <ThemePicker></ThemePicker>
        </span>
      </div>
      <div className='mb-16 flex items-center justify-center'>
        <span className='font-poppins text-3xl text-black dark:text-white'>
          One last step...
        </span>
      </div>
      <div className='mb-6 flex justify-center'>
        <div className='flex w-full max-w-xl gap-4'>
          <button
            className={`btn ${
              selectedUserType === 'CUSTOMER'
                ? 'shadow-2xl shadow-black/50 hover:bg-black hover:text-main dark:shadow-main/50 dark:hover:bg-main dark:hover:text-black'
                : 'btn-secondary opacity-75'
            }`}
            onClick={() => {
              setSelectedUserType('CUSTOMER');
            }}>
            Order on Qwick
          </button>
          <button
            className={`btn ${
              selectedUserType === 'VENDOR'
                ? 'shadow-2xl shadow-black/50 hover:bg-black hover:text-main dark:shadow-main/50 dark:hover:bg-main dark:hover:text-black'
                : 'btn-secondary opacity-75'
            }`}
            onClick={() => {
              setSelectedUserType('VENDOR');
            }}>
            Sell on Qwick
          </button>
        </div>
      </div>
      <div className='mb-16 text-center text-xl text-black dark:text-main'>
        so you will be{' '}
        <span className='font-extrabold'>
          {selectedUserType === 'CUSTOMER' ? 'ordering' : 'selling'}
        </span>{' '}
        on qwick
      </div>
      <div className='mt-8 flex justify-center pb-24'>
        {selectedUserType === 'CUSTOMER' && (
          <AdditionalInfoCustomerForm></AdditionalInfoCustomerForm>
        )}
        {selectedUserType === 'VENDOR' && (
          <AdditionalInfoVendorForm></AdditionalInfoVendorForm>
        )}
      </div>
    </>
  );
};

export default AdditionalInfoForm;
