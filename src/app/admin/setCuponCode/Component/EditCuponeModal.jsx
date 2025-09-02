'use client';

import { Modal, Form, Select, Input, DatePicker, Button, message } from 'antd';
import moment from 'moment';
import { useEffect } from 'react';

const { Option } = Select;

export default function EditCuponModal({ open, setOpen }) {
  const [form] = Form.useForm();

  // Initialize form with default values
  useEffect(() => {
    if (open) {
      form.setFieldsValue({
        applicableServices: 'Select',
        couponName: 'SUMMER20',
        expirationDate: moment('2025-03-31'),
        couponCode: 'BUY1',
        discount: 10,
      });
    }
  }, [open, form]);

  // Handle form submission
  const onFinish = (values) => {
    const formattedValues = {
      ...values,
      expirationDate: values.expirationDate.format('MMMM D, YYYY'), // Format date
    };
    console.log('Form submitted:', formattedValues);
    // Add API call here to save the coupon
    message.success('Coupon created successfully');
    setOpen(false);
    form.resetFields(); // Reset form after submission
  };

  // Handle form submission failure
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    message.error('Please fill all required fields correctly');
  };

  return (
    <Modal centered open={open} onCancel={() => setOpen(false)} footer={null} width={700}>
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Edit Cupon Details</h2>
        <Form form={form} layout="vertical" onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Form.Item
            label="Applicable Services"
            name="applicableServices"
            rules={[{ required: true, message: 'Please select applicable services' }]}
          >
            <Select>
              <Option value="Select">Select</Option>
              <Option value="ALL SERVICES">ALL SERVICES</Option>
              {/* Add more options as needed */}
            </Select>
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
            name="expirationDate"
            rules={[{ required: true, message: 'Please select an expiration date' }]}
          >
            <DatePicker
              className="w-full"
              format="MMMM D, YYYY"
              disabledDate={(current) => current && current < moment().endOf('day')}
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
                transform: (value) => Number(value), // Convert to number for validation
                message: 'Discount must be between 0 and 100%',
              },
            ]}
          >
            <Input type="number" addonAfter="%" placeholder="Enter discount percentage" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full mt-4 bg-teal-500 hover:bg-teal-600 border-none"
            >
              SAVE
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
