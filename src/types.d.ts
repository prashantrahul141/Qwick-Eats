import type { User, UserRole } from '@prisma/client';
import type { order, cartItem, foodItem } from '@prisma/client';
import type { ReactNode } from 'react';

type DefinedUserRole = Exclude<UserRole, 'NOTDEFINED'>;

type navigationOptions = Array<{
  url: string;
  icon: ReactNode;
  iconActive: ReactNode;
  text: string;
}>;

type tabOptionsNames =
  | 'Home'
  | 'Orders'
  | 'Profile'
  | 'Dashboard'
  | 'History'
  | 'Food Items';

type TReturnVendorOrder = order & {
  user: User;
  cartItems: Array<
    cartItem & {
      foodItem: foodItem;
    }
  >;
};

export {
  DefinedUserRole,
  navigationOptions,
  tabOptionsNames,
  TReturnVendorOrder,
};
