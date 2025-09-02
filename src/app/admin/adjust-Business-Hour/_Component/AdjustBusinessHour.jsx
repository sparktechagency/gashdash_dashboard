'use client';

import React, { useState } from 'react';
import EditBusinessHourModalForm from './EditBunninessHourModalForm';
import { useGetBussinessHourQuery } from '@/redux/api/bussinesHourApi';
import { Spin } from 'antd'; // For loading state

const AdjustBusinessHour = () => {
  const [businessHours, setBusinessHours] = useState(false);
  const [selectedBusinessHour, setSelectedBusinessHour] = useState(null);

  // Fetch business hours data from API
  const { data, isLoading } = useGetBussinessHourQuery();

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center p-5">
        <Spin tip="Loading business hours..." />
      </div>
    );
  }

  // Handle no data
  if (!data?.data || data.data.length === 0) {
    return (
      <div className="flex justify-center p-5">
        <p className="text-gray-600">No business hours data available.</p>
      </div>
    );
  }

  // Find nonSubscriber and subscriber hours from API response
  const nonSubscriberHours = data.data.find((item) => item.userType === 'nonSubscriber') || {
    day: 'N/A',
    time: 'N/A',
  };
  const subscriberHours = data.data.find((item) => item.userType === 'subscriber') || {
    day: 'N/A',
    time: 'N/A',
  };

  return (
    <div className="flex gap-5 justify-center p-5">
      {/* Non-Subscriber Hours Card */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 w-96 py-10">
        <h3 className="text-base font-semibold text-gray-800 mb-2">Non-Subscriber Hours</h3>
        <p className="text-sm text-gray-600">{nonSubscriberHours.day}</p>
        <p className="text-sm text-gray-600 mb-2">{nonSubscriberHours.time}</p>
        <button
          onClick={() => {
            setSelectedBusinessHour(nonSubscriberHours);
            setBusinessHours(true);
          }}
          className="text-white flex items-center gap-1 text-center justify-center border w-full p-1 rounded-md bg-[#5dd3a6]"
        >
          Edit
        </button>
      </div>

      {/* Subscriber Hours Card */}
      <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 w-96 py-10">
        <h3 className="text-base font-semibold text-gray-800 mb-2">Subscriber Hours</h3>
        <p className="text-sm text-gray-600">{subscriberHours.day}</p>
        <p className="text-sm text-gray-600 mb-2">{subscriberHours.time}</p>
        <button
          onClick={() => {
            setSelectedBusinessHour(subscriberHours);
            setBusinessHours(true);
          }}
          className="text-white flex items-center gap-1 text-center justify-center border w-full p-1 rounded-md bg-[#5dd3a6]"
        >
          Edit
        </button>
      </div>

      <EditBusinessHourModalForm
        open={businessHours}
        setOpen={setBusinessHours}
        selectedBusinessHour={selectedBusinessHour}
      />
    </div>
  );
};

export default AdjustBusinessHour;
