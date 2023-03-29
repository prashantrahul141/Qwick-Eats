import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import CustomerEditProfileForm from '@src/components/forms/editProfile/customerEditProfile';
import CustomerOnlyGuard from '@src/components/guards/customerOnlyGuard';
import type { NextPage } from 'next';

const CustomerProfilePage: NextPage = () => {
  return (
    <CustomerOnlyGuard>
      <TopBarResponsive type='CUSTOMER' activeTab='Profile'></TopBarResponsive>
      <div className='flex w-full justify-center'>
        <div className='w-full max-w-5xl px-4 py-4'>
          <span className='text-3xl font-semibold text-black dark:text-white'>
            Profile
          </span>

          <CustomerEditProfileForm></CustomerEditProfileForm>
        </div>
      </div>
    </CustomerOnlyGuard>
  );
};

export default CustomerProfilePage;
