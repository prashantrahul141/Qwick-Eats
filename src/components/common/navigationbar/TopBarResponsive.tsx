import type { DefinedUserRole, tabOptionsNames } from '@src/types';
import type { FC } from 'react';
import TopBarLargeScreen from './TopBarLargeScreen';
import TopBarMobile from './TopBarMobile';

const TopBarResponsive: FC<{
  type: DefinedUserRole;
  activeTab?: tabOptionsNames;
}> = ({ type, activeTab = '' }) => {
  return (
    <div className='w-full'>
      <div className='sm:hidden'>
        <TopBarMobile type={type} activeTab={activeTab}></TopBarMobile>
      </div>
      <div className='hidden sm:block'>
        <TopBarLargeScreen
          type={type}
          activeTab={activeTab}></TopBarLargeScreen>
      </div>
    </div>
  );
};

export default TopBarResponsive;
