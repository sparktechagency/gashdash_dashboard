'use client';
import { Input, Table } from 'antd';
import { Tooltip } from 'antd';
import { ConfigProvider } from 'antd';
import { Check, Search } from 'lucide-react';
import { Eye } from 'lucide-react';
import { UserX } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import ProfileModal from '@/components/SharedModals/ProfileModal';
import { Tag } from 'antd';
import moment from 'moment';
import { useBlockUnblockUserMutation, useGetAllusersQuery } from '@/redux/api/userApi';
import { toast } from 'sonner';

export default function DriverAccDetailsTable() {
  const [searchText, setSearchText] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [userData, setUserData] = useState();

  const role = 'driver';

  // User data with query parameterss
  const { data, isError, isLoading } = useGetAllusersQuery({
    limit: 10,
    page: currentPage,
    searchText,
    role,
  });

  // status handler api end point

  const [updateStatus, { isLoading: updating }] = useBlockUnblockUserMutation();

  // Table Data transformation
  const tabledata =
    data?.data?.data?.map((item, inx) => ({
      key: inx + 1 + (currentPage - 1) * 10,
      name: item?.fullname || 'Not provided',
      userImg: item?.image,
      email: item?.email,
      contact: item?.phoneNumber || 'Not provided',
      date: moment(item?.createdAt).format('DD-MM-YYYY'),
      status: item?.status,
      address: item?.address || 'Not provided',
      accountType: item?.role,
      _id: item?._id,
    })) || [];

  // Block user handler
  const handleBlockUser = async (values) => {
    const status = values?.status == 'active' ? 'blocked' : 'active';
    try {
      const res = await updateStatus({ id: values?._id, data: status }).unwrap();
      if (res.success) {
        toast.success(
          `${values.name} ${values?.status == 'blocked' ? 'unblocked' : 'Blcoked'} successfully!`
        );
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: 'Serial',
      dataIndex: 'key',
      render: (value) => `#${value}`,
    },
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
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'contact',
    },
    {
      title: 'Date',
      dataIndex: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => (
        <Tag color={value === 'active' ? '#1B70A6' : '#F16365'} className="text-white">
          {value}
        </Tag>
      ),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          {record.status === 'block' ? (
            <Tooltip title="Accept Request">
              <button onClick={() => setProfileModalOpen(true)}>
                <Check color="#1B70A6" size={22} />
              </button>
            </Tooltip>
          ) : (
            ''
          )}
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setUserData(record);
                setProfileModalOpen(true);
              }}
            >
              <Eye color="#1B70A6" size={22} />
            </button>
          </Tooltip>

          <Tooltip title="Block User">
            <CustomConfirm
              title={`${record?.status == 'blocked' ? 'Unblock User' : 'Deactive this User'}`}
              description={`Are you sure to ${record?.status == 'blocked' ? 'Active' : 'Deactive'} this user?`}
              loading={updating}
              onConfirm={() => handleBlockUser(record)}
            >
              <button>
                <UserX color="#F16365" size={22} />
              </button>
            </CustomConfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1B70A6',
          colorInfo: '#1B70A6',
        },
      }}
    >
      <div className="w-full mb-20">
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
          dataSource={tabledata}
          scroll={{ x: '100%' }}
          pagination={{
            pageSize: 10,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
            total: data?.data?.meta?.total,
            showTotal: (total) => `Total ${total} items`,
          }}
          loading={isLoading}
        ></Table>
      </div>

      <ProfileModal open={profileModalOpen} setOpen={setProfileModalOpen} userData={userData} />
    </ConfigProvider>
  );
}
