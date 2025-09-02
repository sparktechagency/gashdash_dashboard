'use client';

import { Form, Input, InputNumber, Modal, Switch } from 'antd';
import { useEffect } from 'react';
import { useUpdateserviceStatusMutation } from '@/redux/api/serviceApi';
import { toast } from 'sonner';

export default function ServiceEditModalForm({ open, setOpen, Service }) {
  const [form] = Form.useForm();
  const [updateService, { isLoading }] = useUpdateserviceStatusMutation();

  useEffect(() => {
    if (Service && open) {
      form.setFieldsValue({
        serviceName: Service.name?.replace(/^\$/, '') || '',
        price: parseFloat(Service.price?.replace(/^\$/, '')) || 0,
        status: Service.status === true || Service.status === 'true',
      });
    }
  }, [Service, open, form]);

  const onSubmit = async (values) => {
    if (!Service) {
      toast.error('No service selected for editing');
      return;
    }
    const id = Service.id;
    try {
      const updatedService = {
        serviceName: values.serviceName,
        price: values.price,
        status: values.status,
      };
      const res = await updateService({ id, data: updatedService }).unwrap();
      if (res?.success) {
        toast.success('Service updated successfully');
        form.resetFields();
        setOpen(false);
      } else {
        toast.error(res?.message || 'Failed to update service');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update service');
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
    >
      <div>
        <h1 className="text-center text-xl font-bold">Edit Service Details</h1>

        <Form
          form={form}
          layout="vertical"
          className="mt-5"
          onFinish={onSubmit}
          initialValues={{
            serviceName: Service?.name?.replace(/^\$/, '') || '',
            price: parseFloat(Service?.price?.replace(/^\$/, '')) || 0,
            status: Service?.status === true || Service?.status === 'true',
          }}
        >
          <Form.Item
            label="Service Name"
            name="serviceName"
            rules={[{ required: true, message: 'Please input the service name!' }]}
          >
            <Input
              type="text"
              placeholder="Enter service name"
              className="w-full p-2 border rounded"
            />
          </Form.Item>

          <Form.Item
            label="Service Price"
            name="price"
            rules={[{ required: true, message: 'Please input the service price!' }]}
          >
            <InputNumber
              type="number"
              placeholder="Enter service price"
              className="!w-full p-2 border rounded"
              min={0}
              step={0.01}
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
