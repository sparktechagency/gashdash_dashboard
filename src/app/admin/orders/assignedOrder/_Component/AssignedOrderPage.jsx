'use client';

import { useGetSingleOrdersQuery } from '@/redux/api/orderApi';
import moment from 'moment';
import { useSearchParams } from 'next/navigation';

export default function AssignedOrder() {
  const searchParams = useSearchParams();
  const id = searchParams.get('order_id');

  // get single order info

  const { data, isLoading } = useGetSingleOrdersQuery({ id });

  const order = data?.data;
  const coustomer = data?.data?.userId;

  if (isLoading)
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Order Information</h2>
      </div>
      <div className="space-y-2">
        <p>Order ID: #2244</p>
        <p>Order Date:{moment(order?.createdAt).format('MMMM Do YYYY')}</p>
        {/* <p>Scheduled Time: March 22, 3:00 PM</p> */}
        <p>Status: {order?.orderStatus}</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Customer Details</h2>
      <div className="space-y-2">
        <p>Customer Name: {coustomer?.fullname}</p>
        <p>Phone:{coustomer?.phoneNumber || 'Not Provided'}</p>
        <p>Email: {coustomer?.email}</p>
        <p>Address: {coustomer?.address || 'Not Provided'}</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Fuel Details</h2>
      <div className="space-y-2">
        <p>Fuel Type: {order?.fuelType}</p>
        <p>Quantity: {order?.amount} gallons</p>
        <p>Total Price: ${order?.finalAmountOfPayment}</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Driver Information</h2>
      <div className="space-y-2">
        <p>Driver Name: {order?.driverId?.fullname}</p>
        {/* <p>Status: Assigned</p>
        <p>Time: 3:00 PM</p> */}
        <p>Driver Phone: {order?.driverId?.phoneNumber || 'Not Provided'}</p>
        <p>Driver Email: {order?.driverId?.email || 'Not Provided'}</p>
      </div>
      {/* <h2 className="text-lg font-semibold mt-4">Completion Checklist</h2>
      <div className="space-y-2">
        <p>Did you check the gas?</p>
        <p>Not applicable</p>
        <p>Did you verify any spillage?</p>
        <p>Not applicable</p>
        <p>Did you ensure the vehicle is in safe condition?</p>
        <p>Not applicable</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Proof of Delivery</h2>
      <div className="space-y-2">
        <p>Image: Not available</p>
        <p>Completion Time: Not applicable</p>
      </div> */}
    </div>
  );
}
