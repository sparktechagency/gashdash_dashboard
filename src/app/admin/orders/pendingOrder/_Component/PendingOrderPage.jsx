'use client';

import { useGetAllValidDriversQuery } from '@/redux/api/driversApi';
import { useGetSingleOrdersQuery, useUpdateOrderStatusMutation } from '@/redux/api/orderApi';
import { Button, Form, Select } from 'antd';
import moment from 'moment';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PendingOrder() {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const id = searchParams.get('order_id');
  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  // assign driver to order
  const [updateContent] = useUpdateOrderStatusMutation();

  // get single order info

  const { data, isLoading } = useGetSingleOrdersQuery({ id });

  // get drivers from api

  const { data: driverData, isLoading: isDriverLoading } = useGetAllValidDriversQuery(searchText);

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

  const handleSubmit = async (values) => {
    if (!values?.driverId) {
      toast.error('Please select a driver');
      return;
    }
    try {
      const res = await updateContent({
        orderId: id,
        driverid: values?.driverId,
        status: 'Pending',
      }).unwrap();
      if (res.success) {
        toast.success('Order assigned successfully');
        form.resetFields();
        router.back();
        router.refresh();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  const handleSearch = (value) => {
    setSearchText(value); // Update search text when the user types
  };
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
        <h1>Search Driver</h1>
        <div className="flex items-center gap-5">
          <div className=" w-1/2">
            <Form
              form={form}
              onFinish={handleSubmit}
              layout="vertical"
              style={{ marginTop: '40px' }}
            >
              <div className="flex gap-12 justify-between items-center">
                <div className="flex-1">
                  {/* ==============  Driver Name ============== */}
                  <Form.Item
                    label="Driver Name"
                    name="driverId"
                    rules={[{ required: true, message: 'Please enter Driver Name' }]}
                  >
                    <Select
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Search to Select"
                      optionFilterProp="label"
                      onSearch={handleSearch}
                      filterOption={false}
                      options={driverData?.data?.data?.map((therapist) => ({
                        value: therapist._id,
                        label: therapist?.fullname,
                      }))}
                    />
                  </Form.Item>
                </div>
                <div className="flex gap-5">
                  <Button
                    htmlType="submit"
                    size="large"
                    block
                    style={{ backgroundColor: '#5dd3a6', color: 'white' }}
                    className="!px-10  rounded !h-11"
                    loading={isDriverLoading}
                    disabled={isDriverLoading}
                  >
                    Assign
                  </Button>
                  <button
                    onClick={() => router.back()}
                    className=" text-white w-full px-10  rounded-lg bg-[#e03f3f] h-11"
                  >
                    Cancle
                  </button>
                </div>
              </div>
            </Form>
          </div>
          <div className="flex gap-5"></div>
        </div>
      </div>
    </div>
  );
}
