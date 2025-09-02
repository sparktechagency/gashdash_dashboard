'use client';

import { Button, ConfigProvider, Input, Spin, Table } from 'antd';
import { Tooltip } from 'antd';
import { Eye, Filter, HandCoins, Search } from 'lucide-react';
import { useState } from 'react';
import { Tag } from 'antd';
import EarningModal from './EarningModal';
import {
  useGetTransectionDataQuery,
  useRefundTransectionMutation,
} from '@/redux/api/transactionApi';
import moment from 'moment';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { toast } from 'sonner';
import Image from 'next/image';
import refund from '@/assets/images/refund.png';
import { Download } from 'lucide-react'; // Import Download icon

export default function EarningsTable() {
  const [showEarningModal, setShowEarningModal] = useState(false);
  const [loadingStates, setLoadingStates] = useState({});
  const [searchText, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // get earning data from api
  const { data: earningData, isLoading } = useGetTransectionDataQuery({
    limit: 10,
    page: currentPage,
    searchText,
  });

  // refund transaction
  const [refundTransection] = useRefundTransectionMutation();

  if (isLoading)
    return (
      <div>
        <div className="flex justify-center p-5">
          <Spin tip="Loading..." />
        </div>
      </div>
    );

  // Dummy table data
  const data = earningData?.data?.map((item, inx) => ({
    key: inx + 1,
    id: item?._id,
    transactionId: item?.tranId,
    name: item?.user?.fullname,
    type: item?.paymentType,
    status: item?.status,
    amount: Number(item?.amount).toFixed(2),
    date: moment(item?.createdAt).format('lll'),
  }));

  const handleRefund = async (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true })); // Set loading for specific transaction
    try {
      const res = await refundTransection(id).unwrap();
      if (res?.success) {
        toast.success('Transaction refunded successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false })); // Reset loading state
    }
  };

  // Function to convert data to CSV
  const downloadCSV = () => {
    const headers = [
      'Transaction ID',
      'Name',
      'Transaction Type',
      'Amount',
      'Transaction Date',
      'Status',
    ];
    const rows = data.map((item) => [
      item.transactionId,
      item.name,
      item.type,
      `$${item.amount}`,
      item.date,
      item.status,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'earnings_transactions.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  // ================== Table Columns ================
  const columns = [
    { title: 'Trans. ID', dataIndex: 'transactionId', render: (value) => `${value}` },
    { title: 'Name', dataIndex: 'name' },
    {
      title: 'Trans. type',
      dataIndex: 'type',
      filters: [
        { text: 'Subscription', value: 'subscription' },
        { text: 'Order', value: 'order' },
        { text: 'Tip', value: 'tip' },
      ],
      onFilter: (value, record) => record.type === value,
      filterIcon: (filtered) => (
        <Filter
          style={{
            color: filtered ? '#1890ff' : undefined,
            fontSize: '16px',
          }}
        />
      ),
      render: (value) => (
        <Tag color="blue" className="!text-base font-semibold">
          {value}
        </Tag>
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
    // { title: 'ACC Number', dataIndex: 'accNumber' },
    { title: 'Trans. Date', dataIndex: 'date' },

    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex items-center gap-x-3">
          {record?.type === 'order' && record?.status !== 'refunded' ? (
            <CustomConfirm
              title="Refund Transaction"
              description="Are you sure you want to refund this transaction?"
              onConfirm={() => {
                handleRefund(record?.id);
              }}
              loading={loadingStates[record?.id] || false} // Use specific loading state
            >
              <button>
                {loadingStates[record?.id] ? (
                  <Spin size="small" />
                ) : (
                  <Image src={refund} width={28} height={28} alt="refund" />
                )}
              </button>
            </CustomConfirm>
          ) : null}
          {record?.type === 'order' && record?.status === 'refunded' ? (
            <Tag color="#F5B5B5" className="!text-base font-semibold !ml-5 cursor-not-allowed">
              Refunded
            </Tag>
          ) : null}
        </div>
      ),
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: '#1B70A6', colorInfo: '#1B70A6' } }}>
      <div className="w-full flex justify-between items-center gap-x-5 mb-3">
        <Input
          placeholder="Search "
          prefix={<Search className="mr-2 text-black" size={20} />}
          className="h-11 !border !rounded-lg !text-base w-1/3"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          type="primary"
          icon={<Download size={18} />}
          onClick={downloadCSV}
          style={{ backgroundColor: '#1B70A6', color: 'white' }}
        >
          Download CSV
        </Button>
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
            pageSize: 10,
            showSizeChanger: false,
            current: currentPage,
            onChange: (page) => setCurrentPage(page),
            total: earningData?.meta?.total || 0, // Use total from meta if available
            showTotal: (total) => `Total ${total} transactions`,
          }}
        ></Table>
      </section>

      {/* Show earning modal */}
      <EarningModal open={showEarningModal} setOpen={setShowEarningModal} />
    </ConfigProvider>
  );
}
