'use client';
import { ConfigProvider, Input, Table, Tooltip } from 'antd';
import { Eye, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';
import CheckDetailsModal from './CheckDetailModal';
import { useGetCheckListHistoryQuery } from '@/redux/api/checkListApi';

const CheckListTable = () => {
  const [searchText, setSearchText] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [checkListData, setCheckListData] = useState(null);

  // get checklist history data
  const { data: checkListHistoryData, isLoading } = useGetCheckListHistoryQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  // map the data to the format required by the table
  const data = checkListHistoryData?.checklists?.data?.map((item) => ({
    orderId: item?._id,
    driverName: item?.userId?.fullname,
    driverImg: item?.userId?.image,
    comment: item?.comment,
    time: new Date(item?.createdAt).toLocaleString(),
  }));

  const columns = [
    { title: 'Delivery ID', dataIndex: 'orderId', render: (value) => `#${value}` },
    {
      title: 'Driver Name',
      dataIndex: 'driverName',
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <p className="font-medium">{value}</p>
        </div>
      ),
    },

    { title: 'Time', dataIndex: 'time' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (value, record) => (
        <div className="flex-center-start gap-x-2">
          <Tooltip title="Show Details">
            <button
              onClick={() => {
                setProfileModalOpen(true);
                setCheckListData(record);
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
    <div>
      <ConfigProvider theme={{ token: { colorPrimary: '#5dd3a6', colorInfo: '#5dd3a6' } }}>
        <div className="mb-20">
          <div className="mb-5 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">CheckList History</h2>
            <div className="flex w-1/2 ml-auto gap-x-5 mb-3">
              <Input
                placeholder="Search by name or email"
                prefix={<Search className="mr-2 text-black" size={20} />}
                className="h-11 !border !rounded-lg !text-base"
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
          </div>
          <Table
            style={{ overflowX: 'auto' }}
            columns={columns}
            dataSource={data}
            scroll={{ x: '100%' }}
            loading={isLoading}
            pagination={{
              total: checkListHistoryData?.checklists?.meta?.total,
              current: currentPage,
              pageSize: 10,
              onChange: (page) => setCurrentPage(page),
            }}
          ></Table>
        </div>

        <CheckDetailsModal
          open={profileModalOpen}
          setOpen={setProfileModalOpen}
          checkListData={checkListData}
          questions={
            checkListHistoryData?.checklists?.data?.find(
              (item) => item._id === checkListData?.orderId
            )?.questions
          }
        />
      </ConfigProvider>
    </div>
  );
};

export default CheckListTable;
