import type { TReturnVendorOrder } from '@src/types';
import { getOrderStatusColor } from '@src/utils/clientSideUtilFunctions';
import type { FC } from 'react';
import { useState, Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import type { orderState } from '@prisma/client';
import { BsChevronExpand } from 'react-icons/bs';
import { orderStateOptions } from '@src/utils/constants';
import { api } from '@src/utils/api';

const VendorOrder: FC<{ order: TReturnVendorOrder }> = ({ order }) => {
  const [defaultOrderState, setDefaultOrderState] = useState<orderState>(
    order.orderState
  );
  const [orderStateVar, setOrderStateVar] = useState<orderState>(
    order.orderState
  );
  const updateOrderStateQuery = api.vendorOrder.updateOrderState.useMutation();

  const updateOrderState = async () => {
    await updateOrderStateQuery.mutateAsync({
      targetOrderId: order.id,
      targetState: orderStateVar,
    });

    setDefaultOrderState(orderStateVar);
  };

  return (
    <>
      <div className='w-screen max-w-3xl rounded-md border border-gray-300 px-3 py-2 text-black shadow-md dark:border-bord dark:bg-black dark:text-white'>
        {/* primary info */}
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

        {/* interactions */}
        <div className='mt-4 flex items-center justify-end gap-3'>
          {/* status */}
          <div className='flex-auto '>
            <span
              className={`${String(
                getOrderStatusColor(defaultOrderState)
              )} font-bold`}>
              {defaultOrderState}
            </span>
          </div>

          <Listbox value={orderStateVar} onChange={setOrderStateVar}>
            <div className='relative w-[10rem] select-none'>
              <Listbox.Button className='relative w-full cursor-pointer rounded-md border border-muted/20 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:border-bord dark:bg-black dark:text-white sm:text-sm'>
                <span className='block truncate'>
                  {`${String(orderStateVar[0])}${String(
                    orderStateVar.slice(1, orderStateVar.length).toLowerCase()
                  )}`}
                </span>
                <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
                  <BsChevronExpand
                    className='h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'>
                <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black sm:text-sm'>
                  {orderStateOptions.map(
                    (orderStateOption, orderStateOptionIndex) => (
                      <Listbox.Option
                        key={orderStateOptionIndex}
                        className={({ active }) =>
                          `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                            active
                              ? 'bg-bord text-white'
                              : 'text-gray-600 dark:text-gray-300'
                          }`
                        }
                        value={orderStateOption.value}>
                        {(selected) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}>
                              {orderStateOption.title}
                            </span>
                          </>
                        )}
                      </Listbox.Option>
                    )
                  )}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
          <button
            onClick={updateOrderState}
            className='btn h-9 max-w-fit px-3 py-0'
            disabled={orderStateVar === defaultOrderState}>
            Update
          </button>
        </div>
      </div>
    </>
  );
};

export default VendorOrder;
