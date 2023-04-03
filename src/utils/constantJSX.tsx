import type { navigationOptions } from '@src/types';
import { AiFillHome, AiOutlineHome, AiOutlineHistory } from 'react-icons/ai';
import {
  MdFastfood,
  MdOutlineSpaceDashboard,
  MdSpaceDashboard,
} from 'react-icons/md';
import { IoFastFoodOutline } from 'react-icons/io5';
import { FaRegUserCircle, FaUserCircle, FaHistory } from 'react-icons/fa';

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
const vendorNavigationOptions: navigationOptions = [
  {
    url: '/sell/',
    text: 'Dashboard',
    icon: <MdOutlineSpaceDashboard></MdOutlineSpaceDashboard>,
    iconActive: <MdSpaceDashboard></MdSpaceDashboard>,
  },
  {
    url: '/sell/history',
    text: 'History',
    icon: <AiOutlineHistory></AiOutlineHistory>,
    iconActive: <FaHistory></FaHistory>,
  },
  {
    url: '/sell/profile',
    text: 'Profile',
    icon: <FaRegUserCircle></FaRegUserCircle>,
    iconActive: <FaUserCircle></FaUserCircle>,
  },
];
const adminNavigationOptions: navigationOptions = [];

export {
  customerNavigationOptions,
  vendorNavigationOptions,
  adminNavigationOptions,
};
