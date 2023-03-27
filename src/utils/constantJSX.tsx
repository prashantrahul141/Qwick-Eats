import type { navigationOptions } from '@src/types';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { MdFastfood } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';

const customerNavigationOptions: navigationOptions = [
  {
    url: '/order/',
    text: 'Home',
    icon: <AiOutlineHome></AiOutlineHome>,
    iconActive: <AiFillHome></AiFillHome>,
  },
  {
    url: '/order/orders',
    text: 'Orders',
    icon: <IoFastFoodOutline></IoFastFoodOutline>,
    iconActive: <MdFastfood></MdFastfood>,
  },
];
const vendorNavigationOptions: navigationOptions = [];
const adminNavigationOptions: navigationOptions = [];

export {
  customerNavigationOptions,
  vendorNavigationOptions,
  adminNavigationOptions,
};
