'use client';

import { Input, Table, Tag } from 'antd';
import { Tooltip } from 'antd';
import { ConfigProvider } from 'antd';
import { Search, Eye } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllEmargencyOrdersQuery } from '@/redux/api/orderApi';

export default function EmargencyOrder({ orderType }) {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();

  // get all orders from the API
  const { data: orders, isLoading } = useGetAllEmargencyOrdersQuery({
    limit: 10,
    page: currentPage,
    searchText: searchText,
    orderType,
  });

  // map the orders to the table data
  const tableData = orders?.data?.data?.map((order, inx) => ({
    key: inx + 1,
    order_id: order?._id,
    status: order.orderStatus,
    location: order.location,
    quantity: order.amount,
    price: order.price,
    customer_name: order?.userId?.fullname,
    fuel: order.fuelType,
    driver: order?.driverId?.fullname || 'Unassigned',
  }));

  // Function to handle navigation based on status
  const handleViewDetails = (status, order_id) => {
    switch (status) {
      case 'Delivered':
        router.push(`/admin/orders/completeOrder?order_id=${order_id}`);
        break;
      case 'Unassigned':
        router.push(`/admin/orders/pendingOrder?order_id=${order_id}`);
        break;
      case 'Pending':
        router.push(`/admin/orders/assignedOrder?order_id=${order_id}`);
        break;
      case 'InProgress':
        router.push(`/admin/orders/assignedOrder?order_id=${order_id}`);
        break;
      case 'Refund Requested':
        router.push(`/admin/orders/refundOrder?order_id=${order_id}`);
        break;
      default:
        break;
    }
  };
  // Table columns
  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: 'Customer',
      dataIndex: 'customer_name',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: 'Fuel',
      dataIndex: 'fuel',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      render: (value) => <span className="text-gray-700">{value}</span>,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      render: (value) => <span className="text-gray-700">{value || 'N/A'}</span>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => {
        let color;
        switch (value) {
          case 'Pending':
            color = 'orange';
            break;
          case 'Unassigned':
            color = 'red';
            break;
          case 'InProgress':
            color = 'blue';
            break;
          case 'Delivered':
            color = 'green';
            break;
          case 'Refund Requested':
            color = 'purple';
            break;
          default:
            color = 'gray';
        }
        return (
          <Tag color={color} className="font-medium">
            {value}
          </Tag>
        );
      },
    },
    {
      title: 'Driver',
      dataIndex: 'driver',
      render: (value) => (
        <span
          className={value === 'Unassigned' ? 'text-red-500 border rounded p-1' : 'text-gray-700'}
        >
          {value}
        </span>
      ),
    },
    // {
    //   title: 'Scheduled Time',
    //   dataIndex: 'scheduled_time',
    //   render: (value) => <span className="text-gray-700">{value || 'N/A'}</span>,
    // },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex items-center gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => handleViewDetails(record.status, record.order_id)}>
              <Eye color="#1B70A6" size={20} />
            </button>
          </Tooltip>
          {/* <Tooltip title="Delete">
            <button>
              <Trash2 color="#FF4D4F" size={20} />
            </button>
          </Tooltip> */}
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
      <div className="flex mb-4 ml-auto w-1/2 gap-x-5">
        <Input
          placeholder="Search by name or order ID"
          prefix={<Search className="mr-2 text-gray-500" size={20} />}
          className="h-11 rounded-lg border text-base"
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Total Orders: {orders?.length}</p>
      </div>

      <Table
        style={{ overflowX: 'auto' }}
        columns={columns}
        dataSource={tableData}
        loading={isLoading}
        scroll={{ x: '100%' }}
        className="rounded-lg shadow-sm"
        rowClassName="hover:bg-gray-50"
        pagination={{
          current: currentPage,
          onChange: (page) => {
            setCurrentPage(page);
          },
          pageSize: 10,
          showSizeChanger: false,
          total: orders?.data?.meta?.total || 0,
          showTotal: (total) => `Total ${total} orders`,
        }}
      />
    </ConfigProvider>
  );
}
