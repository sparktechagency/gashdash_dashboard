'use client';

import { Input, Table } from 'antd';
import { Tooltip } from 'antd';
import { ConfigProvider } from 'antd';
import { Check, Search } from 'lucide-react';
import { Eye } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import DriverDetailsModal from './DriverDetailsModal';
import { useGetAllusersQuery } from '@/redux/api/userApi';
import _ from 'lodash';

export default function DriverDetailsTable() {
  const [searchText, setSearchText] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDriver, setSelectedDriver] = useState(null);

  // ===================Get drivers data from api=======================//
  const role = 'driver';
  // User data with query parameterss
  const { data: driverData, isLoading } = useGetAllusersQuery({
    limit: 10,
    page: currentPage,
    searchText,
    role,
  });

  // Dummy table Data
  const data = driverData?.data?.data?.map((item, inx) => ({
    key: inx + 1,
    name: item?.fullname || 'Not Provided',
    userImg: item?.image,
    email: item?.email,
    contact: item?.phoneNumber || 'Not Provided',
    earnings: item?.totalEarning || 0,
    status: item?.userId?.status,
    address: item?.userId?.address || 'Not Provided',
    todayEarnings: item?.todayEarnings || 0,
    _id: item?._id,
  }));

  // ================== Table Columns ================
  const columns = [
    { title: 'Serial', dataIndex: 'key', render: (value) => `#${value}` },
    {
      title: 'Name',
      dataIndex: 'name',
      render: (value, record) => {
        // Helper function to validate URL
        const isValidUrl = (url) => {
          if (!url) return false;
          return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
        };

        // Get the first letter of the name (uppercase)
        const firstLetter = record?.email ? record?.email.charAt(0).toUpperCase() : '';

        // Determine if the image is valid
        const hasValidImage = isValidUrl(record?.userImg && record?.userImg == null);

        return (
          <div className="flex-center-start gap-x-2">
            {hasValidImage ? (
              <Image
                src={record?.userImg}
                alt="User avatar"
                width={40}
                height={40}
                className="rounded-full w-10 h-auto aspect-square"
              />
            ) : (
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#9bddbe] text-white text-lg font-medium">
                {firstLetter}
              </div>
            )}
            <p className="font-medium">{value}</p>
          </div>
        );
      },
    },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Contact', dataIndex: 'contact' },
    {
      title: 'Earnings',
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <Check color="#1B70A6" size={18} />
          <p className="font-medium">{record.earnings}</p>
        </div>
      ),
      dataIndex: 'earnings',
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'status',
    //   render: (value) => (
    //     <Tag color="green" className="!rounded-full !px-4 !py-1 !text-sm">
    //       {value}
    //     </Tag>
    //   ),
    // },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setProfileModalOpen(true);
                setSelectedDriver(record);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1B70A6', colorInfo: '#1B70A6' } }}>
      <div className="w-1/3 ml-auto gap-x-5 mb-3">
        <Input
          placeholder="Search by name or email"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !border !rounded-lg !text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <Table
        style={{ overflowX: 'auto' }}
        columns={columns}
        dataSource={data}
        scroll={{ x: '100%' }}
        pagination={{
          pageSize: 5,
          current: currentPage,
          onChange: (page) => setCurrentPage(page),
          total: data?.data?.total,
          showTotal: (total) => `Total ${total} items`,
        }}
        loading={isLoading}
      ></Table>

      <DriverDetailsModal
        open={profileModalOpen}
        setOpen={setProfileModalOpen}
        selectedDriver={selectedDriver}
      />
    </ConfigProvider>
  );
}
