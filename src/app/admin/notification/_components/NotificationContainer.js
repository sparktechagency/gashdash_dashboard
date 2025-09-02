'use client';
import NotificationCard from './NotificationCard';
import { Button } from 'antd';
import { useGetMyNotificationQuery, useMarkAsReadMutation } from '@/redux/api/notificationApi';
import { toast } from 'sonner';

// Dummy Data

export default function NotificationContainer() {
  const { data: notificationRes } = useGetMyNotificationQuery({});
  const notificationData = notificationRes?.data || [];
  const [updateNotification] = useMarkAsReadMutation();
  const handelToRead = async () => {
    try {
      await updateNotification({}).unwrap();
      toast.success('All Notification successfully mark as read');
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  console.log('Notification Data:', notificationData);
  return (
    <div className="w-3/4 mx-auto mb-10">
      <section className="mb-10 flex-center-between">
        <h4 className="text-3xl font-semibold">Notifications</h4>
        {/* <div className="space-x-3">
          <Button onClick={handelToRead} type="primary">
            Mark as read
          </Button>
          <Button className="!bg-danger !text-white">Delete all</Button>
        </div> */}
      </section>

      <section className="space-y-8">
        {notificationData?.map((notification) => (
          <NotificationCard key={notification.key} notification={notification} />
        ))}
      </section>
    </div>
  );
}
