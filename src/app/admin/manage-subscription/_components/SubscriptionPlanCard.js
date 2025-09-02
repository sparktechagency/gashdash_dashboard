'use client';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { Badge, Button } from 'antd';
import { Trash2, Edit } from 'lucide-react';
import EditSubscriptionPlanModal from './EditSubscriptionPlanModal';
import { useState } from 'react';
import { useDeleteSubCriptionMutation } from '@/redux/api/subsCriptionApi';
import { toast } from 'sonner';

export default function SubscriptionPlanCard({ data }) {
  const [showEditPlanModal, setShowEditPlanModal] = useState(false);
   const [deletePakage, { isLoading }] = useDeleteSubCriptionMutation();

  // Define the features to display (only those that are true)
  const featuresToShow = [
    {
      key: 'fiftyPercentOffDeliveryFeeAfterWaivedTrips',
      label: '50% off delivery fees after waived trips',
    },
    { key: 'scheduledDelivery', label: 'Scheduled Delivery' },
    { key: 'fuelPriceTrackingAlerts', label: 'Fuel Price Tracking Alerts' },
    {
      key: 'noExtraChargeForEmergencyFuelServiceLimit',
      label: 'No Extra Charge for Emergency Fuel Service',
    },
    {
      key: 'freeSubscriptionAdditionalFamilyMember',
      label: 'Free Subscription for Additional Family Member',
    },
    { key: 'exclusivePromotionsEarlyAccess', label: 'Exclusive Promotions & Early Access' },
  ].filter((feature) => data?.[feature.key] === true);

  // Most popular card (highlighted)
  if (data?.isHighlighted) {
    return (
      <div className="rounded-3xl border border-gray-300 bg-foundation-accent-800 p-7 text-white font-medium flex flex-col justify-between">
        <div>
          <div className="space-y-4">
            <div className="flex-center-between">
              <h4 className="text-2xl font-semibold">{data?.title} Plan</h4>
              <Badge className="rounded-full bg-gradient-to-br from-[#cbf9f2] to-foundation-accent-400 text-base font-semibold text-black !p-2">
                {data?.tag}
              </Badge>
            </div>

            <h1 className="text-5xl font-semibold">
              ${data?.price}{' '}
              <span className="text-xl font-medium text-white/80">/{data?.duration}</span>
            </h1>

            <p className="font-medium text-white/75">{data?.type}</p>
          </div>

          <div className="my-4 h-[1px] w-full border-b border-dashed"></div>

          {/* Display freeDeliverylimit and coverVehiclelimit */}
          <div className="space-y-2">
            <p className="text-lg">Free Delivery Limit: {data?.freeDeliverylimit}</p>
            <p className="text-lg">Cover Vehicle Limit: {data?.coverVehiclelimit}</p>
          </div>

          {/* Display features that are true */}
          {featuresToShow.length > 0 && (
            <div className="mt-4">
              <ul className="list-disc list-inside space-y-2 text-lg">
                {featuresToShow.map((feature) => (
                  <li key={feature.key}>{feature.label}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-x-4 flex-center mt-4">
          <CustomConfirm
            title="Delete Plan"
            description={'Are you sure you want to delete this plan?'}
            onConfirm={() => {}}
          >
            <Button
              className="!font-medium w-1/2 !bg-danger !text-white !border-none"
              icon={<Trash2 size={16} />}
            >
              Delete
            </Button>
          </CustomConfirm>

          <Button
            type="primary"
            className="!font-medium w-1/2"
            icon={<Edit size={16} />}
            onClick={() => setShowEditPlanModal(true)}
          >
            Edit
          </Button>
        </div>
      </div>
    );
  }

  // pakage delete handaller-------------

  const handleDelete = async (id) => {
    try {
      const res = await deletePakage(id).unwrap();
      if (res.success) {
        toast.success('Pakage Delete successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // Normal subscription card
  return (
    <div className="rounded-3xl border border-gray-300 p-7 font-medium flex flex-col justify-between gap-y-4">
      <div>
        <div className="space-y-4">
          <h4 className="text-2xl font-semibold">{data?.title}</h4>
          <h1 className="text-5xl font-semibold">
            ${data?.monthlyPrice}
            <span className="text-xl font-medium text-black/50">/{data?.durationType}</span>
          </h1>
          <p className="font-medium text-black/75">{data?.durationType}</p>
        </div>

        <div className="my-4 h-[1px] w-full border-b border-dashed border-b-black"></div>

        {/* Display freeDeliverylimit and coverVehiclelimit */}
        <div className="space-y-2">
          <p>Free Delivery Limit: {data?.freeDeliverylimit}</p>
          <p>Cover Vehicle Limit: {data?.coverVehiclelimit}</p>
        </div>

        {/* Display features that are true */}
        {featuresToShow.length > 0 && (
          <div className="mt-4">
            <ul className="list-disc list-inside space-y-2">
              {featuresToShow.map((feature) => (
                <li key={feature.key}>{feature.label}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Edit & Delete Button */}
      <div className="space-x-4 flex-center">
        <CustomConfirm
          title="Delete Plan"
          description={'Are you sure you want to delete this plan?'}
          onConfirm={() => handleDelete(data?._id)}
          isLoading={isLoading}
        >
          <Button
            className="!font-medium w-1/2 !bg-danger !text-white !border-none"
            icon={<Trash2 size={16} />}
          >
            Delete
          </Button>
        </CustomConfirm>

        <Button
          type="primary"
          className="!font-medium w-1/2"
          icon={<Edit size={16} />}
          onClick={() => setShowEditPlanModal(true)}
        >
          Edit
        </Button>
      </div>
      {/* Edit Subscription Plan Modal */}
      <EditSubscriptionPlanModal
        data={data}
        open={showEditPlanModal}
        setOpen={setShowEditPlanModal}
      />
    </div>
  );
}
