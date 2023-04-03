import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import VendorEditProfileForm from '@src/components/forms/editProfile/vendorEditProfile';
import VendorOnlyGuard from '@src/components/guards/vendorOnlyGuard';
import type { FC } from 'react';

const VendorProfilePage: FC = () => {
  return (
    <VendorOnlyGuard>
      <TopBarResponsive type={'VENDOR'} activeTab='Profile'></TopBarResponsive>
      <div className='flex w-full justify-center'>
        <div className='w-full max-w-5xl px-4 py-4'>
          <span className='text-3xl font-semibold text-black dark:text-white'>
            Profile
          </span>
          <VendorEditProfileForm></VendorEditProfileForm>
        </div>
      </div>
    </VendorOnlyGuard>
  );
};

export default VendorProfilePage;
