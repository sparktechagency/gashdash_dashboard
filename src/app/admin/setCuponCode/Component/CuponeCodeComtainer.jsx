'use client';

import { Edit, Trash } from 'lucide-react';
import CreateNewCuponModal from './CreateNewCuponeCodeModal';
import { useState } from 'react';
import EditCuponModal from './EditCuponeModal';
import { useDeleteCuponeMutation, useGetAllCuponeQuery } from '@/redux/api/cuponCodeApi';
import { Divider, Spin } from 'antd';
import moment from 'moment';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { toast } from 'sonner';

const CouponCodeContainer = () => {
  const [open, setOpen] = useState(false);
  const [Editopen, EditsetOpen] = useState(false);

  // get all coupons form api
  const { data, isLoading } = useGetAllCuponeQuery();

  //delete coupon api handler
  const [deleteCoupon, { isLoading: isDeleting }] = useDeleteCuponeMutation();

  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center p-5">
          <Spin tip="Loading coupons..." />
        </div>
      </div>
    );
  }
  // if (!data?.data || data.data.length === 0) {
  //   return (
  //     <div className="flex justify-center p-5">
  //       <p className="text-gray-600">No coupons data available.</p>
  //     </div>
  //   );
  // }

  const coupons = data?.data?.map((item) => ({
    id: item?._id,
    name: item?.couponName,
    code: item?.couponCode,
    expirationDate: moment(item?.expiryDate).format('MMMM D, YYYY'),
    applicableServices: item?.service?.serviceName,
    discount: item?.discount,
  }));

  // Handlers (to be replaced with actual logic)
  const handleCreateCoupon = () => {
    setOpen(true);
  };

  const handleEditPrice = (id) => {
    EditsetOpen(true);
  };

  const handleRemove = async (id) => {
    try {
      const res = await deleteCoupon(id).unwrap();
      toast.success('Coupon deleted successfully');
      // if (res?.success) {
      //   toast.success('Coupon deleted successfully');
      // }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete coupon');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Coupon Code</h2>
        <button
          onClick={handleCreateCoupon}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          + Create Coupon
        </button>
      </div>

      <div className="space-y-4">
        {coupons?.map((coupon) => (
          <div
            key={coupon.id}
            className="p-4 border border-gray-200 rounded-lg bg-gray-50 flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-medium text-gray-900">Coupon Name - {coupon.name}</p>
              <p className="text-lg font-medium text-gray-900">Coupon Code - {coupon.code}</p>
              <p className="text-sm text-gray-600">Expiration Date - {coupon.expirationDate}</p>
              <p className="text-sm text-gray-600">
                Applicable Services -{' '}
                <span className="font-bold"> {coupon.applicableServices}</span>
              </p>
              <Divider />
              <p className="text-sm text-black font-bold">Discount - {coupon.discount}%</p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEditPrice(coupon.id)}
                className="px-3 py-1 bg-blue-200 text-blue-700 rounded hover:bg-blue-300 transition-colors flex items-center gap-5  "
              >
                <Edit size={16} strokeWidth={2} />
                Edit Price
              </button>

              <CustomConfirm
                title="Delete Coupon"
                description="Are you sure to Delete this coupon?"
                onConfirm={() => handleRemove(coupon.id)}
              >
                <button className="px-3 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300 transition-colors flex items-center gap-5 ">
                  <Trash size={16} strokeWidth={2} />

                  {isDeleting ? 'Deleting...' : 'Remove'}
                </button>
              </CustomConfirm>
            </div>
          </div>
        ))}
      </div>
      <CreateNewCuponModal open={open} setOpen={setOpen} />
      <EditCuponModal open={Editopen} setOpen={EditsetOpen} />
    </div>
  );
};

export default CouponCodeContainer;
//
