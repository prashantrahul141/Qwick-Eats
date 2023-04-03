import { type NextPage } from 'next';
import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import VendorOnlyGuard from '@src/components/guards/vendorOnlyGuard';

const VendorHomePage: NextPage = () => {
  return (
    <>
      <VendorOnlyGuard>
        <TopBarResponsive
          type={'VENDOR'}
          activeTab='Dashboard'></TopBarResponsive>
      </VendorOnlyGuard>
    </>
  );
};

export default VendorHomePage;
