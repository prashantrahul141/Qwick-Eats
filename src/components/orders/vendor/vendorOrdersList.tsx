import type { orderState } from '@prisma/client';
import type { FC } from 'react';
import { useEffect } from 'react';
import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { allOrderFilterOptions } from '@src/utils/constants';
import { BsChevronExpand } from 'react-icons/bs';
import { api } from '@src/utils/api';
import LoadingSpinner from '@src/components/common/loadingSpinner';
import VendorOrder from './vendorOrder';
import type { TReturnVendorOrder } from '@src/types';

const VendorOrdersList: FC = () => {
  const [ordersList, setOrdersList] = useState<Array<TReturnVendorOrder>>([]);
  const [ordersFilterState, setOrdersFilter] = useState<orderState | 'ALL'>(
    'ALL'
  );
  const getAllOrdersQuery = api.vendorOrder.getAllOrders.useQuery({
    orderState: ordersFilterState,
  });

  // refetch orders when filter is change.
  useEffect(() => {
    getAllOrdersQuery
      .refetch()
      .then((result) => {
        if (result.data) {
          setOrdersList(result.data);
        }
      })
      .catch(() => {
        undefined;
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersFilterState]);

  // set data state
  useEffect(() => {
    if (getAllOrdersQuery.data) {
      setOrdersList(() => getAllOrdersQuery.data);
    }
  }, [getAllOrdersQuery.data]);

  return (
    <>
      <div className='mt-2 w-full'>
        {/* Orders Filter */}
        <Listbox value={ordersFilterState} onChange={setOrdersFilter}>
          <div className='relative ml-auto mt-2 mr-2 max-w-xs select-none'>
            <Listbox.Button className='relative w-full cursor-pointer rounded-md border border-muted/20 bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-300 dark:border-bord dark:bg-black dark:text-white sm:text-sm'>
              <span className='block truncate'>
                {`${String(ordersFilterState[0])}${String(
                  ordersFilterState
                    .slice(1, ordersFilterState.length)
                    .toLowerCase()
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
                {allOrderFilterOptions.map(
                  (filterOption, filterOptionIndex) => (
                    <Listbox.Option
                      key={filterOptionIndex}
                      className={({ active }) =>
                        `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                          active
                            ? 'bg-bord text-white'
                            : 'text-gray-600 dark:text-gray-300'
                        }`
                      }
                      value={filterOption.value}>
                      {(selected) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? 'font-medium' : 'font-normal'
                            }`}>
                            {filterOption.title}
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
      </div>

      {/* Orders */}
      <div className='mt-6 w-full'>
        <div className='mx-auto w-fit'>
          {getAllOrdersQuery.status === 'success' &&
            ordersList.map((order) => {
              return <VendorOrder key={order.id} order={order}></VendorOrder>;
            })}

          {getAllOrdersQuery.status === 'loading' && (
            <div className='h-72'>
              <LoadingSpinner></LoadingSpinner>
            </div>
          )}

          {getAllOrdersQuery.status === 'error' && (
            <div className='flex h-72 w-full items-center justify-center'>
              <span className='text-black dark:text-white'>
                Unable to fetch orders.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorOrdersList;
