'use client';

import { useCreateNewServiceMutation } from '@/redux/api/serviceApi';
import { Button, Form, Input, InputNumber, Modal } from 'antd';
import { toast } from 'sonner';

export default function AddServiceModalForm({ open, setOpen }) {
  const [form] = Form.useForm();
  // create new service api handler
  const [create, { isLoading }] = useCreateNewServiceMutation();

  const onsubmit = async (value) => {
    const values = {
      serviceName: value.serviceName,
      price: value.price,
      status: true,
    };
    try {
      const res = await create(values).unwrap();
      if (res?.success) {
        setOpen(false);
        form.resetFields();
        toast.success('Service created successfully');
      } else {
        toast.error('Failed to create service');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'An error occurred while creating the service');
    }
  };
  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div>
        <h1 className="text-center items-center text-xl font-bold">Add New Service</h1>

        <Form form={form} layout="vertical" className="mt-5" onFinish={onsubmit}>
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
              type="text"
              placeholder="Enter service price"
              className="!w-full p-2 border rounded"
            />
          </Form.Item>
          {/* <Form.Item label="Inactive Service" valuePropName="checked">
              <Switch />
              </Form.Item> */}
          <Form.Item>
            <Button
              loading={isLoading}
              htmlType="submit"
              disabled={isLoading}
              type="submit"
              className="w-full !bg-[#5dd3a6] rounded-lg !text-white p-2 "
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
