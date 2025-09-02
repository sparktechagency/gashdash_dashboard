'use client';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { ConfigProvider, Input, Table, Tag, Tooltip } from 'antd';
import { Edit, Search, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import ServiceEditModalForm from './ServiceEditModal';
import AddServiceModalForm from './ServiceAddModal';
import { useDeleteServiceMutation, useGetAllserviceQuery } from '@/redux/api/serviceApi';
import { toast } from 'sonner';

const ServiceListTable = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  // Get all service API handler
  const { data: serviceData, isLoading } = useGetAllserviceQuery({
    limit: 10,
    page: currentPage,
    searchText: searchText,
  });

  // Delete service API handler
  const [deleteServiceData, { isLoading: isDeleting }] = useDeleteServiceMutation();

  // Map table data
  const data =
    serviceData?.data?.data?.map((item, inx) => ({
      key: inx + 1,
      name: item.serviceName,
      price: `$${item.price}`,
      status: item.status,
      id: item._id,
    })) || [];

  // Delete service handler
  const handleBlockUser = async (id) => {
    try {
      const res = await deleteServiceData(id).unwrap();
      if (res?.success) {
        toast.success('Service deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete service');
    }
  };

  // Table columns
  const columns = [
    {
      title: 'Serial',
      dataIndex: 'key',
      render: (value) => `#${value}`,
    },
    {
      title: 'Service Name',
      dataIndex: 'name',
      render: (value) => <p className="font-medium">{value}</p>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (value) => <p className="font-medium">{value}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => (
        <Tag color={value === true || value === 'true' ? 'green' : 'red'}>
          {value === true || value === 'true' ? 'Active' : 'Inactive'}
        </Tag>
      ),
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title="Edit Details">
            <button
              onClick={() => {
                setSelectedService(record);
                setDetailsModalOpen(true);
              }}
            >
              <Edit color="#1B70A6" size={22} />
            </button>
          </Tooltip>
          <Tooltip title="Delete Service">
            <CustomConfirm
              title="Delete Service"
              loading={isDeleting}
              description="Are you sure to delete this service?"
              onConfirm={() => handleBlockUser(record.id)}
            >
              <button>
                <Trash2 color="#F16365" size={22} />
              </button>
            </CustomConfirm>
          </Tooltip>
        </div>
      ),
    },
  ];

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#5dd3a6',
            colorInfo: '#5dd3a6',
          },
        }}
      >
        <div className="flex w-1/2 ml-auto gap-x-5 mb-3">
          <Input
            placeholder="Search by name"
            prefix={<Search className="mr-2 text-black" size={20} />}
            className="h-11 !border !rounded-lg !text-base"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => setAddServiceOpen(true)}
            className="bg-[#5dd3a6] text-white rounded-lg px-4 py-2 w-[200px] text-lg font-medium"
          >
            Add Service
          </button>
        </div>

        <Table
          style={{ overflowX: 'auto' }}
          columns={columns}
          dataSource={data}
          scroll={{ x: '100%' }}
          loading={isLoading}
          pagination={{
            current: currentPage,
            pageSize: 10,
            total: serviceData?.data?.total || 0,
            onChange: (page) => setCurrentPage(page),
          }}
        />
      </ConfigProvider>
      <ServiceEditModalForm
        open={detailsModalOpen}
        setOpen={setDetailsModalOpen}
        Service={selectedService}
      />
      <AddServiceModalForm open={addServiceOpen} setOpen={setAddServiceOpen} />
    </div>
  );
};

export default ServiceListTable;
