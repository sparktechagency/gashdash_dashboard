'use client';

import { ConfigProvider, Input, Table } from 'antd';
import { Tooltip } from 'antd';
import { Check, Cross, Search, TicketX, Trash2 } from 'lucide-react';

import { Tag } from 'antd';

import moment from 'moment';
import {
  useGetWithdrawRequestQuery,
  useUpdateWithdrawRequestMutation,
} from '@/redux/api/withdrwaApi';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { toast } from 'sonner';
import { useState } from 'react';

export default function WithdrawReqTable() {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  // Get earning data from API
  const { data: earningData, isLoading } = useGetWithdrawRequestQuery({
    search: searchText,
    page: currentPage,
    limit: 10,
  });

  // update withdraw request mutation
  const [updateWithdrawRequest, { isLoading: isUpdating }] = useUpdateWithdrawRequestMutation();

  if (isLoading)
    return (
      <div>
        {' '}
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );

  // Map table data with image and status
  const data = earningData?.data?.data?.map((item, inx) => ({
    key: inx + 1,
    requestId: item?._id,
    driverName: item?.userId?.fullname,
    amount: Number(item?.withdrawAmount).toFixed(2),
    requestDate: moment(item?.createdAt).format('MMM DD, YYYY, hh:mm A'),
    status: item?.status || 'Pending',
  }));

  // ================== Table Columns ================
  const columns = [
    // { title: 'Request ID', dataIndex: 'requestId', render: (value) => `${value}` },
    {
      title: 'Driver Name',
      dataIndex: 'driverName',
      render: (name) => (
        <div className="flex items-center gap-2">
          <span>{name}</span>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      render: (value) => (
        <Tag color="blue" className="!text-base font-semibold">
          ${value}
        </Tag>
      ),
    },
    { title: 'Request Date', dataIndex: 'requestDate' },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (status) => {
        let color;
        switch (status.toLowerCase()) {
          case 'pending':
            color = 'orange';
            break;
          case 'disbursed':
            color = 'blue';
            break;
          case 'rejected':
            color = 'red';
            break;
          default:
            color = 'gray';
        }
        return (
          <Tag color={color} className="!text-base font-semibold">
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex items-center gap-2">
          {record.status === 'Pending' ? (
            <Tooltip title="Approve Request">
              <CustomConfirm
                title="Are you sure you want to approve this request?"
                onConfirm={() => {
                  handleConfirm(record.requestId);
                }}
              >
                <Check color="#1B70A6" size={20} />
              </CustomConfirm>
            </Tooltip>
          ) : null}
          {record.status === 'Pending' ? (
            <Tooltip title="Delete Request">
              <CustomConfirm
                title="Are you sure you want to delete this request?"
                onConfirm={() => {
                  handleDelete(record.requestId);
                }}
              >
                <TicketX color="#FF4D4F" size={20} />
              </CustomConfirm>
            </Tooltip>
          ) : null}
        </div>
      ),
    },
  ];

  // handle confirm action
  const handleConfirm = (requestId) => {
    try {
      const response = updateWithdrawRequest({ id: requestId, data: { status: 'Approved' } });
      if (response?.success) {
        toast.success('Request approved successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to approve request');
    }
  };
  const handleDelete = (requestId) => {
    try {
      const response = updateWithdrawRequest({ id: requestId, data: { status: 'Rejected' } });
      if (response?.success) {
        toast.success('Request Rejected successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to reject request');
    }
  };

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1B70A6', colorInfo: '#1B70A6' } }}>
      <div className="w-1/3 ml-auto gap-x-5 mb-3">
        <Input
          placeholder="Search"
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !border !rounded-lg !text-base"
          onChange={(e) => setSearchText(e.target.value)} // Uncomment and add setSearchText state if needed
        />
      </div>

      {/* Earning table */}
      <section className="my-10">
        <Table
          style={{ overflowX: 'auto' }}
          columns={columns}
          dataSource={data}
          scroll={{ x: '100%' }}
          loading={isLoading}
          className="rounded-lg shadow-sm"
          rowClassName="hover:bg-gray-50"
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: earningData?.data?.meta?.total || 0,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </section>

      {/* Show earning modal */}
    </ConfigProvider>
  );
}
