import type { navigationOptions } from '@src/types';
import { AiFillHome, AiOutlineHome } from 'react-icons/ai';
import { MdFastfood } from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaRegUserCircle, FaUserCircle } from 'react-icons/fa';

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
  {
    url: '/order/profile',
    text: 'Profile',
    icon: <FaRegUserCircle></FaRegUserCircle>,
    iconActive: <FaUserCircle></FaUserCircle>,
  },
];
const vendorNavigationOptions: navigationOptions = [];
const adminNavigationOptions: navigationOptions = [];

export {
  customerNavigationOptions,
  vendorNavigationOptions,
  adminNavigationOptions,
};
