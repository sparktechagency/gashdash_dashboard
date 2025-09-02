'use client';

import { Button, Empty } from 'antd';
import { Edit } from 'lucide-react';
import SubscriptionPlanCard from './SubscriptionPlanCard';
import CreateSubscriptionPlanModal from './CreateSubscriptionPlanModal';
import { useState } from 'react';

import { useGetAllSubCriptionQuery } from '@/redux/api/subsCriptionApi';

export default function SubscriptionsContainer() {
  const [showCreatePlanModal, setShowCreatePlanModal] = useState(false);

  const { data } = useGetAllSubCriptionQuery();

  const subscriptionPlanss = data?.data?.data;

  // console.log(subscriptionPlanss);

  return (
    <div>
      <Button
        type="primary"
        size="large"
        icon={<Edit size={20} />}
        iconPosition="start"
        className="!w-full !py-6"
        onClick={() => setShowCreatePlanModal(true)}
      >
        Create Subscription Plan
      </Button>

      {subscriptionPlanss?.length > 0 ? (
        <section className="my-10 grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
          {subscriptionPlanss?.map((data, idx) => (
            <SubscriptionPlanCard key={idx} data={data} />
          ))}
        </section>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Empty />
        </div>
      )}

      {/* Create Subscription Plan Modal */}
      <CreateSubscriptionPlanModal open={showCreatePlanModal} setOpen={setShowCreatePlanModal} />
    </div>
  );
}
