import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import VendorOnlyGuard from '@src/components/guards/vendorOnlyGuard';
import type { FC } from 'react';

const VendorProfilePage: FC = () => {
  return (
    <VendorOnlyGuard>
      <TopBarResponsive type={'VENDOR'} activeTab='Profile'></TopBarResponsive>
    </VendorOnlyGuard>
  );
};

export default VendorProfilePage;
