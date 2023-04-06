import type { TReturnVendorOrder } from '@src/types';
import type { FC } from 'react';

const VendorOrder: FC<{ order: TReturnVendorOrder }> = ({ order }) => {
  return (
    <>
      <div className='rounded-md border border-gray-300 px-3 py-2 text-black shadow-md dark:border-bord dark:bg-black dark:text-white'>
        <div className='flex justify-center gap-4'>
          <div className='w-1/2'>
            <div className=''>
              <div className='flex w-full items-center text-gray-400 dark:text-muted'>
                <span className='text-xs'>Name</span>
                <span className='flex flex-auto justify-end text-xs'>
                  Quantity
                </span>
              </div>
              {order.cartItems.map((cartItem) => {
                return (
                  <span key={cartItem.id} className='flex items-center gap-5'>
                    <span className=''>{cartItem.foodItem.name}</span>
                    <span className='flex flex-auto justify-end'>
                      {cartItem.quantity}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>

          <div className='min-h-full border-r border-r-gray-300 dark:border-r-bord'></div>

          <div className='w-1/2'>
            <div className='flex flex-col'>
              <span className='font-bold'>{order.user.name}</span>
              <address className='text-sm text-gray-800 hover:underline dark:text-gray-300'>
                <a href={`tel:+91${order.user.phoneNumber}`}>
                  {order.user.phoneNumber}
                </a>
              </address>
              <address className='text-sm text-gray-800 dark:text-gray-300'>
                {order.user.address}
              </address>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorOrder;
