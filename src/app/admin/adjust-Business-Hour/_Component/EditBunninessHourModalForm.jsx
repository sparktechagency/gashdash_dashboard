'use client';

import { Form, Input, Modal, Button, TimePicker } from 'antd';
import { useEffect } from 'react';
import { useUpdatebussinessHourMutation } from '@/redux/api/bussinesHourApi';
import { toast } from 'sonner';
import moment from 'moment';

export default function EditBusinessHourModalForm({ open, setOpen, selectedBusinessHour }) {
  const [form] = Form.useForm();
  const [updateBusinessHour, { isLoading }] = useUpdatebussinessHourMutation();

  // Initialize form with selectedBusinessHour data
  useEffect(() => {
    if (selectedBusinessHour && open) {
      // Parse time string (e.g., "10:00 AM - 06:00 PM") into moment objects
      const [startTime, endTime] = selectedBusinessHour.time
        .split(' - ')
        .map((time) => moment(time, 'hh:mm A'));
      form.setFieldsValue({
        userType: selectedBusinessHour.userType,
        day: selectedBusinessHour.day,
        businessTime: startTime && endTime ? [startTime, endTime] : null,
      });
    }
  }, [selectedBusinessHour, open, form]);

  const onSubmit = async (values) => {
    try {
      // Format time range as string (e.g., "10:00 AM - 06:00 PM")
      const formattedTime = values.businessTime
        ? `${values.businessTime[0].format('hh:mm A')} - ${values.businessTime[1].format('hh:mm A')}`
        : selectedBusinessHour.time;

      const updatedValues = {
        userType: selectedBusinessHour?.userType,
        day: values.day,
        time: formattedTime,
      };

      const res = await updateBusinessHour({
        data: updatedValues,
        // id: selectedBusinessHour?._id,
      }).unwrap();

      if (res?.success) {
        toast.success('Business hours updated successfully');
        setOpen(false);
        form.resetFields();
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to update business hours');
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
          Edit {selectedBusinessHour?.userType === 'subscriber' ? 'Subscriber' : 'Non-Subscriber'}{' '}
          Hours
        </h1>

        <Form form={form} layout="vertical" className="mt-5" onFinish={onSubmit}>
          <Form.Item
            label="User Type"
            name="userType"
            rules={[{ required: true, message: 'User type is required!' }]}
          >
            <Input type="text" disabled className="w-full p-2 border rounded" />
          </Form.Item>

          <Form.Item
            label="Days"
            name="day"
            rules={[{ required: true, message: 'Please input the days!' }]}
          >
            <Input
              type="text"
              placeholder="Enter days (e.g., Monday-Sunday)"
              className="w-full p-2 border rounded"
            />
          </Form.Item>

          <Form.Item
            label="Time"
            name="businessTime"
            rules={[{ required: true, message: 'Please select the time range!' }]}
          >
            <TimePicker.RangePicker
              format="hh:mm A"
              className="!w-full"
              use12Hours
              minuteStep={15}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-[#5dd3a6]"
              loading={isLoading}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
}
