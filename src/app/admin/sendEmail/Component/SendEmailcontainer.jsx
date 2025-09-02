'use client';

import FormWrapper from '@/components/Form/FormWrapper';
import UTextEditor from '@/components/Form/UTextEditor';
import { useSendEmailMutation } from '@/redux/api/sendEmailApi';
import { Button } from 'antd';
import { Edit } from 'lucide-react';
import { toast } from 'sonner';

export default function SendEmailContainer() {
  const [sendEmail, { isLoading }] = useSendEmailMutation();
  const handleSubmit = (values) => {
    const message = {
      message: values.message,
    };
    sendEmail(message)
      .unwrap()
      .then((res) => {
        if (res.success) {
          toast.success('Email sent successfully');
        }
      })
      .catch((error) => {
        toast.error(error?.data?.message || 'Failed to send email');
      });
  };
  return (
    <section>
      <h3 className="text-2xl font-semibold mb-6">Send Email</h3>

      <FormWrapper onSubmit={handleSubmit}>
        <UTextEditor
          name="message"
          placeholder="Note: Enter email content here. (e.g How and why did you come up with the idea? etc)"
        />

        <Button
          htmlType="submit"
          type="primary"
          size="large"
          className="w-full rounded-xl"
          icon={<Edit size={18} />}
          loading={isLoading}
        >
          Send
        </Button>
      </FormWrapper>
    </section>
  );
}
