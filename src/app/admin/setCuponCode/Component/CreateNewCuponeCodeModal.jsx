'use client';

import { useCreateNewCuponMutation } from '@/redux/api/cuponCodeApi';
import { useGetAllserviceQuery } from '@/redux/api/serviceApi';
import { Modal, Form, Select, Input, DatePicker, Button } from 'antd';
import { debounce } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { toast } from 'sonner';

const { Option } = Select;

export default function CreateNewCuponModal({ open, setOpen }) {
  const [form] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  console.log(setCurrentPage);

  //=============================== get all services api handler for applicable services dropdown ============================
  const { data: serviceData, isLoading } = useGetAllserviceQuery({
    limit: 10,
    page: currentPage,
    searchText: searchText,
  });

  const service = serviceData?.data?.data;

  // Debounced search handler to reduce API calls
  const handleSearch = debounce((value) => {
    setSearchText(value);
  }, 500);

  // create new coupon api handler
  const [create, { isLoading: isCreating }] = useCreateNewCuponMutation();

  // Handle form submission
  const onFinish = async (values) => {
    try {
      const res = await create(values).unwrap();
      if (res?.success) {
        toast.success('Coupon created successfully');
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to create coupon');
    }
  };

  return (
    <Modal centered open={open} onCancel={() => setOpen(false)} footer={null} width={700}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Create New Coupon</h2>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Applicable Services"
            name="service"
            rules={[{ required: true, message: 'Please select applicable services' }]}
          >
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Search to Select"
              optionFilterProp="label"
              onSearch={handleSearch}
              filterOption={false}
              options={service?.map((service) => ({
                value: service?._id,
                label: service?.serviceName,
              }))}
            ></Select>
          </Form.Item>

          <Form.Item
            label="Coupon Name"
            name="couponName"
            rules={[{ required: true, message: 'Please enter the coupon name' }]}
          >
            <Input placeholder="Enter coupon name" />
          </Form.Item>

          <Form.Item
            label="Expiration Date"
            name="expiryDate"
            rules={[{ required: true, message: 'Please select an expiration date' }]}
          >
            <DatePicker
              className="w-full"
              format="MMMM D, YYYY"
              disabledDate={(current) => current && current < moment().endOf('day')} // Disable past dates
            />
          </Form.Item>

          <Form.Item
            label="Coupon Code"
            name="couponCode"
            rules={[{ required: true, message: 'Please enter the coupon code' }]}
          >
            <Input placeholder="Enter coupon code" />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              { required: true, message: 'Please enter the discount percentage' },
              {
                type: 'number',
                min: 0,
                max: 100,
                transform: (value) => Number(value),
                message: 'Discount must be between 0 and 100%',
              },
            ]}
          >
            <Input type="number" addonAfter="%" placeholder="Enter discount percentage" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={isCreating}
              disabled={isCreating}
              type="primary"
              htmlType="submit"
              className="w-full mt-4 bg-teal-500 hover:bg-teal-600 border-none"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
