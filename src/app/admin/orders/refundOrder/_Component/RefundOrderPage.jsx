'use client';

import { Button } from 'antd';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import OrderDetailsModal from '@/components/SharedModals/OrderDetailsModal';

export default function RefundRequestedOrder() {
  return (
    <div className="p-6 max-w-full mx-auto bg-white rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Order Information</h2>
        <Button type="primary">
          <Eye size={16} className="mr-2" /> View Details
        </Button>
      </div>
      <div className="space-y-2">
        <p>Order ID: #2244</p>
        <p>Order Date: March 22, 2025, 04:16 PM +06</p>
        <p>Scheduled Time: March 22, 3:00 PM</p>
        <p>Status: Refund Requested</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Customer Details</h2>
      <div className="space-y-2">
        <p>Customer Name: Eleanor Pena</p>
        <p>Phone: +1-555-123-4567</p>
        <p>Email: elanor.pena@example.com</p>
        <p>Address: 789 Pine Rd</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Fuel Details</h2>
      <div className="space-y-2">
        <p>Fuel Type: Premium</p>
        <p>Quantity: 15 gallons</p>
        <p>Price: $50.00</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Driver Information</h2>
      <div className="space-y-2">
        <p>Driver Name: Unassigned</p>
        <p>Status: Unassigned</p>
        <p>Time: Unassigned</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Completion Checklist</h2>
      <div className="space-y-2">
        <p>Did you check the gas?</p>
        <p>Not applicable</p>
        <p>Did you verify any spillage?</p>
        <p>Not applicable</p>
        <p>Did you ensure the vehicle is in safe condition?</p>
        <p>Not applicable</p>
      </div>
      <h2 className="text-lg font-semibold mt-4">Proof of Delivery</h2>
      <div className="space-y-2">
        <p>Image: Not available</p>
        <p>Completion Time: Not applicable</p>
      </div>
    </div>
  );
}
