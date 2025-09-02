'use client';

import { RiCloseLargeLine } from 'react-icons/ri';
import { Form, Button, Modal, Divider, InputNumber, Select, Input } from 'antd';
import { useCreateDeliveryAndMendetoryTripMutation } from '@/redux/api/priceAdjustmentApi';
import { toast } from 'sonner';

const AddNewDeliveryTripPriceModal = ({ open, setOpen }) => {
  const [form] = Form.useForm();

  // add new fuel price api handler

  const [add, { isLoading }] = useCreateDeliveryAndMendetoryTripMutation();

  const handleSubmit = async (values) => {
    const updatedValues = {
      ...values,
      zipCode: values.zipCode ? values.zipCode.split(',').map((zip) => zip.trim()) : [],
    };
    try {
      const res = await add(updatedValues).unwrap();
      if (res?.success) {
        toast.success('Price added successfully');
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to add price');
    }
  };

  return (
    <Modal
      open={open}
      footer={null}
      centered={true}
      onCancel={() => setOpen(false)}
      closeIcon={false}
      style={{ minWidth: '900px', position: 'relative' }}
    >
      <div
        className="absolute right-0 top-0 h-12 w-12 cursor-pointer rounded-bl-3xl "
        onClick={() => setOpen(false)}
      >
        <RiCloseLargeLine size={18} color="black" className="absolute left-1/3 top-1/3" />
      </div>
      <h1 className="text-2xl font-semibold text-center">
        Add New Price for Delivery and Mendatory trip
      </h1>
      <Divider />
      <div>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          style={{ maxWidth: '800px', margin: '0 auto', padding: '0 16px' }}
        >
          <Form.Item
            label=" Name"
            name="name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input className="h-10 !w-full" placeholder="Enter Fuel Name" />
          </Form.Item>
          <Form.Item
            label="Covered Zip Codes"
            name="zipCode"
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
              placeholder="Enter Covered Zip Codes (e.g., 4444,12345,44444)"
              className="w-full p-2 border rounded h-10"
            />
          </Form.Item>
          <Form.Item
            label=" Price"
            name="price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <InputNumber className="h-10 !w-full" placeholder="Enter New price" />
          </Form.Item>
          <Form.Item>
            <Button
              loading={isLoading}
              type="primary"
              htmlType="submit"
              style={{ width: '100%', height: '40px' }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddNewDeliveryTripPriceModal;
