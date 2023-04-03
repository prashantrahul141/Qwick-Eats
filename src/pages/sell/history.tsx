import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import VendorOnlyGuard from '@src/components/guards/vendorOnlyGuard';
import type { FC } from 'react';

const VendorHistoryPage: FC = () => {
  return (
    <VendorOnlyGuard>
      <TopBarResponsive type='VENDOR' activeTab='History'></TopBarResponsive>
    </VendorOnlyGuard>
  );
};

export default VendorHistoryPage;
