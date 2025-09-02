'use client';

import { useGetSingleDriverDataQuery } from '@/redux/api/driversApi';
import { Modal } from 'antd';
import clsx from 'clsx';

export default function DriverDetailsModal({ open, setOpen, selectedDriver }) {
  const userId = selectedDriver?._id || 'N/A';
  const { data, isLoading } = useGetSingleDriverDataQuery({
    id: userId,
    skip: !open && !selectedDriver,
  });

  const earnings = [
    { title: 'Total Earnings', amount: data?.data?.totalEarnings || 0 },
    { title: 'Today Earnings', amount: data?.data?.todayEarnings || 0 },
  ];

  if (!userId || !selectedDriver) return null;

  return (
    <Modal
      centered
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={800}
      className="!w-[90%] md:!w-[800px]"
    >
      <div>
        <h1 className="text-center items-center text-xl font-bold">Driver Details</h1>
        <div>
          <h1>Earning Details</h1>
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-7 px-12 py-8 md:grid-cols-2">
              {earnings.map((earning, index) => (
                <div
                  key={index}
                  className={clsx(
                    'border-2 p-8 rounded-lg bg-[#00AEEF] text-white',
                    earning.title === 'Total Earnings' ? 'bg-[#00AEEF]' : 'bg-[#409E7A]'
                  )}
                >
                  <h1 className="font-bold text-2xl">{earning.title}</h1>
                  <h1 className="text-xl mt-3">{earning.amount}</h1>
                </div>
              ))}
            </div>
          )}
          <h1 className="items-center text-xl font-bold mt-10">Basic Info</h1>
          <p className="text-lg mt-3">
            <span className="font-bold">Driver Name :</span> {selectedDriver?.name}
          </p>
          <p className="text-lg mt-3">
            <span className="font-bold">Email :</span> {selectedDriver?.email}
          </p>
          <p className="text-lg mt-3">
            <span className="font-bold">Contact :</span> {selectedDriver?.contact}
          </p>
          <p className="text-lg mt-3">
            <span className="font-bold">Address :</span> {selectedDriver?.address || 'Not Provided'}
          </p>
        </div>
      </div>
    </Modal>
  );
}
