import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import CustomerOnlyGuard from '@src/components/guards/customerOnlyGuard';
import type { NextPage } from 'next';

const OrdersPage: NextPage = () => {
  return (
    <>
      <CustomerOnlyGuard>
        <TopBarResponsive
          type={'CUSTOMER'}
          activeTab='Orders'></TopBarResponsive>
      </CustomerOnlyGuard>
    </>
  );
};

export default OrdersPage;
