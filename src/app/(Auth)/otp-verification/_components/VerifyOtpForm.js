'use client';

import FormWrapper from '@/components/Form/FormWrapper';
import UOtpInput from '@/components/Form/UOtpInput';
import { useVerifyEmailMutation } from '@/redux/api/authApi';
import { otpSchema } from '@/schema/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from 'antd';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'sonner';

export default function VerifyOtpForm() {
  const router = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyEmailMutation();

  const onSubmit = async (data) => {
    try {
      const res = await verifyOtp(data).unwrap();
      if (res?.success == true) {
        toast.success(res?.message || 'OTP verified successfully');
        router.push('/set-new-password');
      } else {
        throw new Error(res?.message || 'Verification failed');
      }
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error('Something went wrong');
      }
    }

    router.push('/set-new-password');
  };

  return (
    <div className="px-6 py-8">
      <Link
        href="/login"
        className="text-primary-blue flex-center-start gap-x-2 font-medium hover:text-primary-blue/85 mb-4"
      >
        <ArrowLeft size={18} /> Back to login
      </Link>

      <section className="mb-8 space-y-2">
        <h4 className="text-3xl font-semibold ">Verify OTP</h4>
        <p className="text-dark-gray">Enter the otp that we&apos;ve sent to your email</p>
      </section>

      <FormWrapper onSubmit={onSubmit} resolver={zodResolver(otpSchema)}>
        <UOtpInput name="otp" />

        <Button
          type="primary"
          size="large"
          className="w-full !font-semibold !h-10"
          htmlType="submit"
          loading={isLoading}
          disabled={isLoading}
        >
          Submit
        </Button>
      </FormWrapper>
    </div>
  );
}
