'use client';
import { Divider, Spin } from 'antd';
import { useState } from 'react';
import EditFuelPriceModal from './EditFuelPriceModal';
import AddNewFuelPriceModal from './AddnewpriceModal';
import {
  useDeleteFuelPriceMutation,
  useGetFuelPriceListQuery,
} from '@/redux/api/priceAdjustmentApi';
import moment from 'moment';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { toast } from 'sonner';

const FuelPrice = () => {
  const [open, setOpen] = useState(false);
  const [openPrice, setOpenprice] = useState(false);
  const [editId, setEditId] = useState(null);
  // get all fuel price from api
  const { data, isLoading } = useGetFuelPriceListQuery();

  // delete fuel price handler
  const [deleteFuelPrice] = useDeleteFuelPriceMutation();

  const fuelData = data?.data?.map((item, index) => ({
    key: index + 1,
    type: item?.fuelName,
    price: item?.fuelPrice,
    lastUpdated: moment(item?.updatedAt).format('MMM DD, YYYY'),
    zipCode: item?.zipCode?.map((item) => item).join(', '),
    id: item?._id,
  }));

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center p-5">
          <Spin tip="Loading fuel price..." />
        </div>
      </div>
    );
  }

  const handleDelte = async (id) => {
    try {
      const res = await deleteFuelPrice(id).unwrap();
      if (res?.success) {
        toast.success('Fuel price deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete fuel price');
    }
  };

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <button
          onClick={() => {
            setOpenprice(true);
          }}
          className="bg-[#409E7A] text-white border p-2 rounded-lg"
        >
          Add New Price
        </button>
      </div>
      <div className="grid grid-cols-2 gap-10 justify-center p-4">
        {fuelData.map((fuel, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4  bg-gray-50 shadow-sm">
            <h3 className="text-lg font-semibold mb-2">{fuel.type}</h3>
            <p className="text-sm font-medium mb-1">Current: ${fuel.price.toFixed(2)}/gal</p>
            <p>
              <span className="font-semibold">Zip Code:</span> {fuel.zipCode}
            </p>
            <Divider />
            <p className="text-sm mb-3">Last Updated: {fuel.lastUpdated}</p>
            <div className="flex  gap-2">
              <button
                onClick={() => {
                  setOpen(true);
                  setEditId(fuel);
                }}
                className="bg-[#5dd3a6] text-white px-3 py-1 rounded-md flex items-center gap-1transition w-full text-center  justify-center"
              >
                Edit Price
              </button>

              <div className="bg-[#ff0000] text-white px-3 py-1 rounded-md flex items-center gap-1transition w-full text-center  justify-center">
                <CustomConfirm
                  title="Are you sure you want to delete this price?"
                  description="This action cannot be undone."
                  onConfirm={() => handleDelte(fuel.id)}
                >
                  {' '}
                  <button>Delete Price</button>
                </CustomConfirm>
              </div>
            </div>
          </div>
        ))}
        <EditFuelPriceModal editId={editId} open={open} setOpen={setOpen} />
        <AddNewFuelPriceModal open={openPrice} setOpen={setOpenprice} />
      </div>
    </div>
  );
};

export default FuelPrice;
