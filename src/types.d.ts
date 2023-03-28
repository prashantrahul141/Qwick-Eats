import type { UserRole } from '@prisma/client';
import type { ReactNode } from 'react';

type DefinedUserRole = Exclude<UserRole, 'NOTDEFINED'>;

type navigationOptions = Array<{
  url: string;
  icon: ReactNode;
  iconActive: ReactNode;
  text: string;
}>;

type tabOptionsNames = 'Home' | 'Orders' | 'Profile';

export { DefinedUserRole, navigationOptions, tabOptionsNames };
