import { type NextPage } from 'next';
import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import VendorOnlyGuard from '@src/components/guards/vendorOnlyGuard';
import VendorOrdersList from '@src/components/orders/vendor/vendorOrdersList';

const VendorHomePage: NextPage = () => {
  return (
    <>
      <VendorOnlyGuard>
        <TopBarResponsive
          type={'VENDOR'}
          activeTab='Dashboard'></TopBarResponsive>
        <VendorOrdersList></VendorOrdersList>
      </VendorOnlyGuard>
    </>
  );
};

export default VendorHomePage;
