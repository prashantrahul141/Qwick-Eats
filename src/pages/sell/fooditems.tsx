import TopBarResponsive from '@src/components/common/navigationbar/TopBarResponsive';
import CreateFoodItemForm from '@src/components/forms/fooditem/createFoodItem';
import VendorOnlyGuard from '@src/components/guards/vendorOnlyGuard';
import type { NextPage } from 'next';
import { useState } from 'react';

const FoodItems: NextPage = () => {
  const [showAddFoodItemForm, setShowAddFoodItemForm] = useState(false);

  return (
    <VendorOnlyGuard>
      <TopBarResponsive
        type={'VENDOR'}
        activeTab='Food Items'></TopBarResponsive>
      <div className='w-full'>
        {/* add button */}
        <div className='flex w-full justify-end pr-12 pt-4'>
          <button
            className='btn w-fit px-2 py-2'
            onClick={() => setShowAddFoodItemForm(true)}>
            Add new food item
          </button>
        </div>

        {/* list of food items */}
        <div></div>
      </div>
      {showAddFoodItemForm && (
        <div className='fixed top-1/4 left-1/2 z-20 w-screen max-w-xl -translate-x-1/2'>
          <CreateFoodItemForm></CreateFoodItemForm>
        </div>
      )}

      {showAddFoodItemForm && (
        <div
          onClick={() => setShowAddFoodItemForm(false)}
          className='absolute top-0 left-0 z-10 h-screen w-screen backdrop-blur-[3px]'></div>
      )}
    </VendorOnlyGuard>
  );
};

export default FoodItems;
