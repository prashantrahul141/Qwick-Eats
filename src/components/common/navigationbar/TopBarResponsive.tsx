import type { DefinedUserRole } from '@src/types';
import type { FC } from 'react';
import CustomerTopBarLargeScreen from './TopBarLargeScreen';
import CustomerTopBarMobile from './TopBarMobile';

const CustomerTopBarResponsive: FC<{
  type: DefinedUserRole;
}> = ({ type }) => {
  return (
    <div className='w-full'>
      <div className='sm:hidden'>
        <CustomerTopBarMobile type={type}></CustomerTopBarMobile>
      </div>
      <div className='hidden sm:block'>
        <CustomerTopBarLargeScreen type={type}></CustomerTopBarLargeScreen>
      </div>
    </div>
  );
};

export default CustomerTopBarResponsive;
