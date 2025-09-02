'use client';

import { Button, Modal } from 'antd';
import React, { useEffect } from 'react';
import { Form, Input, InputNumber, Select } from 'antd';

const { Option } = Select;

export default function EditSubscriptionPlanModal({ open, setOpen, data }) {
  const [form] = Form.useForm();

  // Set default values when data or open changes
  useEffect(() => {
    if (!data || !open) return;

    form.setFieldsValue({
      title: data?.title || '',
      monthlyPrice: data?.monthlyPrice || 0,
      freeDeliveryLimit: data?.freeDeliverylimit || 0,
      coverVehicleLimit: data?.coverVehiclelimit || 0,
      fiftyPercentOffDeliveryFeeAfterWaivedTrips: data?.fiftyPercentOffDeliveryFeeAfterWaivedTrips
        ? true
        : false,
      scheduledDelivery: data?.scheduledDelivery ? true : false,
      fuelPriceTrackingAlerts: data?.fuelPriceTrackingAlerts ? true : false,
      noExtraChargeForEmergencyFuelServiceLimit: data?.noExtraChargeForEmergencyFuelServiceLimit
        ? true
        : false,
      freeSubscriptionAdditionalFamilyMember: data?.freeSubscriptionAdditionalFamilyMember
        ? true
        : false,
      exclusivePromotionsEarlyAccess: data?.exclusivePromotionsEarlyAccess ? true : false,
    });
  }, [form, data, open]);

  const onFinish = (values) => {
    console.log('Form Values:', values);
    setOpen(false);
  };

  return (
    <Modal
      centered
      open={open}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      footer={null}
      title="Edit Subscription Plan"
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

        {/* Monthly Price */}
        <Form.Item label="Monthly Price" name="monthlyPrice">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* Free Delivery Limit */}
        <Form.Item label="Free Delivery Limit" name="freeDeliveryLimit">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* Cover Vehicle Limit */}
        <Form.Item label="Cover Vehicle Limit" name="coverVehicleLimit">
          <InputNumber min={0} style={{ width: '100%' }} />
        </Form.Item>

        {/* 50% off delivery fees after waived trips */}
        <Form.Item
          label="50% off delivery fees after waived trips"
          name="fiftyPercentOffDeliveryFeeAfterWaivedTrips"
        >
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        {/* Scheduled Delivery */}
        <Form.Item label="Scheduled Delivery" name="scheduledDelivery">
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        {/* Fuel Price Tracking Alerts */}
        <Form.Item label="Fuel Price tracking alerts" name="fuelPriceTrackingAlerts">
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        {/* No Extra Charge for Emergency Fuel Service */}
        <Form.Item
          label="No Extra charge for Emergency fuel service Limit"
          name="noExtraChargeForEmergencyFuelServiceLimit"
        >
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        {/* Free Subscription for One Additional Family Member */}
        <Form.Item
          label="Free subscription for one additional family member or household vehicle"
          name="freeSubscriptionAdditionalFamilyMember"
        >
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        {/* Exclusive Promotions and Early Access */}
        <Form.Item
          label="Exclusive promotions and early access to new features"
          name="exclusivePromotionsEarlyAccess"
        >
          <Select>
            <Option value="Yes">Yes</Option>
            <Option value="No">No</Option>
          </Select>
        </Form.Item>

        {/* Submit Button */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Save
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
