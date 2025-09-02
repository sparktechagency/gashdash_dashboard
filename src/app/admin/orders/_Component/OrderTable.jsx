'use client';

import { Input, Table, Tag } from 'antd';
import { Tooltip } from 'antd';
import { ConfigProvider } from 'antd';
import { Search, Eye } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGetAllOrdersQuery } from '@/redux/api/orderApi';

async function getLocationFromCoordinates(lat, lon) {
  const apiKey = process.env.NEXT_PUBLIC_MAP_KEY;
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    console.log('locationData ========================', data);

    if (data.status === 'OK' && data.results[0]) {
      return data.results[0].formatted_address;
    } else {
      return 'Unknown Location';
    }
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'Error Fetching Location';
  }
}

export default function FuelOrderTable({ orderType }) {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [tableData, setTableData] = useState([]);

  const pageSize = 10;
  const router = useRouter();

  const { data: orders, isLoading } = useGetAllOrdersQuery({
    limit: pageSize,
    page: currentPage,
    searchText: searchText,
    orderType,
  });

  useEffect(() => {
    if (!orders?.data?.data) return;

    const fetchLocations = async () => {
      const data = await Promise.all(
        orders.data.data.map(async (order, inx) => {
          let location = 'N/A';
          if (order?.location?.coordinates?.length === 2) {
            // Coordinates are [longitude, latitude], so pass latitude first
            location = await getLocationFromCoordinates(
              order.location.coordinates[1], // latitude
              order.location.coordinates[0] // longitude
            );
            console.log(`Location for order ${order._id}:`, location); // Log each location
          }

          return {
            key: inx + 1,
            order_id: order?._id,
            status: order.orderStatus,
            location,
            quantity: order.amount,
            price: order.price,
            customer_name: order?.userId?.fullname,
            fuel: order.fuelType,
            driver: order?.driverId?.fullname || 'No Driver Assigned',
          };
        })
      );

      setTableData(data);
    };

    fetchLocations();
  }, [orders]);

  const handleViewDetails = (status, order_id) => {
    switch (status) {
      case 'Delivered':
        router.push(`/admin/orders/completeOrder?order_id=${order_id}`);
        break;
      case 'active':
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
      dataIndex: 'location',
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
          className={
            value === 'No Driver Assigned' ? 'text-red-500 border rounded p-1' : 'text-gray-700'
          }
        >
          {value}
        </span>
      ),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex items-center gap-x-3">
          <Tooltip title="Show Details">
            <button onClick={() => handleViewDetails(record.status, record.order_id)}>
              <Eye color="#1B70A6" size={20} />
            </button>
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
      <div className="flex mb-4 ml-auto w-1/2 gap-x-5">
        <Input
          placeholder="Search by name or order ID"
          prefix={<Search className="mr-2 text-gray-500" size={20} />}
          className="h-11 rounded-lg border text-base"
          onChange={(e) => {
            setSearchText(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <div>
        <p className="text-sm text-gray-500 mb-4">Total Orders: {orders?.data?.meta?.total || 0}</p>
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
          pageSize: pageSize,
          showSizeChanger: false,
          total: orders?.data?.meta?.total || 0,
          showTotal: (total) => `Total ${total} orders`,
          onChange: handlePageChange,
        }}
      />
    </ConfigProvider>
  );
}
