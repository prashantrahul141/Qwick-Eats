import type { DefinedUserRole, tabOptionsNames } from '@src/types';
import type { FC } from 'react';
import CustomerTopBarLargeScreen from './TopBarLargeScreen';
import CustomerTopBarMobile from './TopBarMobile';

const CustomerTopBarResponsive: FC<{
  type: DefinedUserRole;
  activeTab?: tabOptionsNames;
}> = ({ type, activeTab = '' }) => {
  return (
    <div className='w-full'>
      <div className='sm:hidden'>
        <CustomerTopBarMobile
          type={type}
          activeTab={activeTab}></CustomerTopBarMobile>
      </div>
      <div className='hidden sm:block'>
        <CustomerTopBarLargeScreen
          type={type}
          activeTab={activeTab}></CustomerTopBarLargeScreen>
      </div>
    </div>
  );
};

export default CustomerTopBarResponsive;
