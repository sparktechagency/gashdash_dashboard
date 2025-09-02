'use client';

import { Button, Modal } from 'antd';
import React from 'react';
import { Form, Input, InputNumber, Select } from 'antd';
import { useCreateSubCriptionMutation } from '@/redux/api/subsCriptionApi';
import { toast } from 'sonner';
import { Option } from 'antd/es/mentions';

export default function CreateSubscriptionPlanModal({ open, setOpen }) {
  const [form] = Form.useForm();

  // create pakage api handaller

  const [create, { isLoading }] = useCreateSubCriptionMutation();

  const onFinish = async (values) => {
    const value = { ...values, shortDescription: 'hello', durationType: 'monthly' };
    try {
      const res = await create(value).unwrap();
      if (res.success) {
        toast.success('Create New Pakage Successfully');
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      title="Create Subscription Plan"
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      width={800}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter a title' }]}
        >
          <Input placeholder="Enter" />
        </Form.Item>

        {/* short description */}
        <Form.Item
          label="Short Description"
          name="shortTitle"
          rules={[{ required: true, message: 'Please enter a short description' }]}
        >
          <Input.TextArea placeholder="Enter" />
        </Form.Item>

        {/* Monthly Price */}
        <Form.Item label="Price" name="monthlyPrice">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* Monthly Price */}
        {/* <Form.Item label="Yearly Price" name="yearlyPrice">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item> */}

        {/* duration type */}
        {/* <Form.Item label="Duration Type" name="durationType">
          <Select>
            <Option value="monthly">Monthly</Option>
            <Option value="yearly">Yearly</Option>
          </Select>
        </Form.Item> */}
        {/* Free Delivery Limit */}
        <Form.Item label="Free Delivery Limit" name="freeDeliverylimit">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* Cover Vehicle Limit */}
        <Form.Item label="Cover Vehicle Limit" name="coverVehiclelimit">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* 50% off delivery fees after waived trips */}
        <Form.Item
          label="50% off delivery fees after waived trips"
          name="fiftyPercentOffDeliveryFeeAfterWaivedTrips"
        >
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        {/* Scheduled Delivery */}
        <Form.Item label="Scheduled Delivery" name="scheduledDelivery">
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        {/* Fuel Price Tracking Alerts */}
        <Form.Item label="Fuel Price tracking alerts" name="fuelPriceTrackingAlerts">
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        {/* No Extra Charge for Emergency Fuel Service */}
        <Form.Item
          label="No Extra charge for Emergency fuel service Limit"
          name="noExtraChargeForEmergencyFuelServiceLimit"
        >
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        {/* Free Subscription for One Additional Family Member */}
        <Form.Item
          label="Free subscription for one additional family member or household vehicle"
          name="freeSubscriptionAdditionalFamilyMember"
        >
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        {/* Exclusive Promotions and Early Access */}
        <Form.Item
          label="Exclusive promotions and early access to new features"
          name="exclusivePromotionsEarlyAccess"
        >
          <Select>
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
