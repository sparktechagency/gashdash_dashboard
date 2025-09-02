'use client';

import { useUpdateCityExpensionMutation } from '@/redux/api/cityexpensionApi';
import { Form, Input, InputNumber, Modal, Switch } from 'antd';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function CityStateExpansionEditModalForm({ open, setOpen, selectedCity }) {
  const [form] = Form.useForm();
  const [updatecity, { isLoading }] = useUpdateCityExpensionMutation();
  const id = selectedCity?._id;

  useEffect(() => {
    if (selectedCity && open) {
      // Convert coveredZipCodes to comma-separated string for display
      const coveredZipCodes = Array.isArray(selectedCity.coveredzipcode)
        ? selectedCity.coveredzipcode.join(',')
        : typeof selectedCity.coveredzipcode === 'string'
          ? selectedCity.coveredzipcode.replace(/^\$/, '')
          : '';

      // Set status as boolean for Switch component
      const status =
        selectedCity.status === true ||
        selectedCity.status === 'true' ||
        selectedCity.status === 'active';

      form.setFieldsValue({
        cityName: selectedCity.name?.replace(/^\$/, '') || '',
        centralZipCode: selectedCity.centralzipcode?.replace(/^\$/, '') || '',
        radius: selectedCity.radius?.replace(/^\$/, '') || '',
        coveredZipCodes: coveredZipCodes,
        status: status,
      });
    }
  }, [selectedCity, open, form]);

  if (!selectedCity) {
    return null;
  }

  const onsubmit = async (values) => {
    try {
      const updatedValues = {
        ...values,
        coveredZipCodes: values.coveredZipCodes
          ? values.coveredZipCodes.split(',').map((zip) => zip.trim())
          : [],
        status: values.status ? 'active' : 'inactive',
      };
      // Call the API
      const res = await updatecity({ data: updatedValues, id }).unwrap();
      if (res?.success) {
        toast.success('City updated successfully');
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update city');
    }
  };

  return (
    <Modal
      centered
      open={open}
      footer={null}
      onCancel={() => {
        setOpen(false);
        form.resetFields();
      }}
      width={600}
      className="rounded-lg"
    >
      <div>
        <h1 className="text-center text-xl font-bold">
          City/State Expansion with Distance Regulation
        </h1>

        <Form form={form} layout="vertical" className="mt-5" onFinish={onsubmit}>
          <Form.Item
            label="City Name"
            name="cityName"
            rules={[{ required: true, message: 'Please input the City name!' }]}
          >
            <Input
              type="text"
              placeholder="Enter City name"
              className="w-full p-2 border rounded"
            />
          </Form.Item>

          <Form.Item
            label="Central Zip Code"
            name="centralZipCode"
            rules={[{ required: true, message: 'Please input the Central Zip Code!' }]}
          >
            <InputNumber
              type="number"
              placeholder="Enter Central Zip Code"
              className="!w-full p-2 border rounded"
            />
          </Form.Item>

          <Form.Item
            label="Covered Zip Codes"
            name="coveredZipCodes"
            rules={[
              { required: true, message: 'Please input the covered Zip Codes!' },
              {
                validator: (_, value) => {
                  if (!value) return Promise.resolve();
                  const zipCodes = Array.isArray(value)
                    ? value
                    : value.split(',').map((zip) => zip.trim());
                  const isValidLength = zipCodes.every((zip) => {
                    const num = zip.replace(/[^0-9]/g, '');
                    return num.length >= 4 && num.length <= 5 && /^\d+$/.test(num);
                  });
                  if (isValidLength) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('Each zip code must be 4 to 5 digits long (e.g., 4444, 12345)')
                  );
                },
              },
            ]}
            getValueFromEvent={(e) => e.target.value.split(',').map((zip) => zip.trim())}
            normalize={(value) => (Array.isArray(value) ? value.join(',') : value)}
          >
            <Input
              placeholder="Enter Covered Zip Codes (e.g., 9001,9002,9003,9004)"
              className="w-full p-2 border rounded"
            />
          </Form.Item>

          <Form.Item
            label="Radius"
            name="radius"
            rules={[{ required: true, message: 'Please input the Radius!' }]}
          >
            <InputNumber
              type="number"
              placeholder="Enter Radius"
              className="!w-full p-2 border rounded"
            />
          </Form.Item>

          <Form.Item
            label="Service Status"
            name="status"
            valuePropName="checked"
            rules={[{ required: true, message: 'Please select the service status!' }]}
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          <Form.Item>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#5dd3a6] rounded-lg text-white p-2"
            >
              {isLoading ? 'Saving...' : 'Save'}
            </button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
