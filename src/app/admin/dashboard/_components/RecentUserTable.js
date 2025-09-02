'use client';

import { ConfigProvider } from 'antd';
import { Table } from 'antd';

import { Eye } from 'lucide-react';

import Image from 'next/image';

import { Tooltip } from 'antd';
import { Tag } from 'antd';
import { useState } from 'react';
import ProfileModal from '@/components/SharedModals/ProfileModal';
import { useGetAllusersQuery } from '@/redux/api/userApi';
import moment from 'moment';

const RecentUserTable = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState();
  // User role
  const role = '';
  // User data with query parameterss
  const { data, isError, isLoading } = useGetAllusersQuery({
    limit: 5,
    page: currentPage,
    searchText,
    role,
  });

  // Table Data transformation
  const tabledata =
    data?.data?.data?.map((item, inx) => ({
      key: inx + 1 + (currentPage - 1) * 10,
      name: item?.fullname || 'Not provided',
      userImg: item?.image,
      email: item?.email,
      contact: item?.phoneNumber || 'Not provided',
      date: moment(item?.createdAt).format('DD-MM-YYYY'),
      accountType: item?.role,
      address: item?.address || 'Not provided',
    })) || [];

  // =============== Table columns ===============
  const columns = [
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
              <div className="flex items-center justify-center rounded-full w-10 h-10 bg-[#75d1c2] text-white text-lg font-medium">
                {firstLetter}
              </div>
            )}
            <p className="font-medium">{value}</p>
          </div>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render: (value) => (
        <Tooltip title={value}>
          <p className="text-sm text-gray-500">{value}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
      render: (value) => (
        <Tooltip title={value}>
          <p className="text-sm text-gray-500">{value}</p>
        </Tooltip>
      ),
    },
    {
      title: 'Account Type',
      dataIndex: 'accountType',
      render: (value) => <Tag color={value === 'driver' ? '#32CD32' : '#F16365'}>{value}</Tag>,
    },
    { title: 'Date', dataIndex: 'date' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <Eye
            size={18}
            strokeWidth={2}
            className="text-blue-500 cursor-pointer"
            onClick={() => {
              setUserData(record);
              setShowProfileModal(true);
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1B70A6', colorInfo: '#1B70A6' } }}>
      <div className="">
        <h1 className="text-xl font-semibold">Recent Users</h1>
        <p className="text-sm text-gray-500 mb-5">
          Here are the latest users who joined the platform.
        </p>
        <Table
          style={{ overflowX: 'auto', width: '100%' }}
          columns={columns}
          dataSource={tabledata}
          scroll={{ x: '100%' }}
          pagination={false}
        ></Table>
      </div>

      {/* Profile Modal */}
      <ProfileModal open={showProfileModal} setOpen={setShowProfileModal} userData={userData} />
    </ConfigProvider>
  );
};

export default RecentUserTable;
