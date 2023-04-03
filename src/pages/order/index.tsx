import { type NextPage } from 'next';
import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import CustomerOnlyGuard from '@src/components/guards/customerOnlyGuard';

const CustomerHomePage: NextPage = () => {
  return (
    <>
      <CustomerOnlyGuard>
        <TopBarResponsive type={'CUSTOMER'} activeTab='Home'></TopBarResponsive>
      </CustomerOnlyGuard>
    </>
  );
};

export default CustomerHomePage;
