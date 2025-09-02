'use client';
import CustomConfirm from '@/components/CustomConfirm/CustomConfirm';
import { ConfigProvider, Input, Table, Tag, Tooltip } from 'antd';
import { Edit, Eye, Search, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import CityStateExpansionEditModalForm from './CityStateExpansionEditModal';
import CityStateExpansionAddModalForm from './CityStateExpansionAddModal';
import {
  useDeleteCityExpensionMutation,
  useGetCityExpensionQuery,
} from '@/redux/api/cityexpensionApi';
import { toast } from 'sonner';

const CityStateExpansionTable = () => {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [detailsModalOpen, setdetailsModalOpen] = useState(false);
  const [addServiceOpen, setaddServiceOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState(null);

  // get cityEcpansion API handler
  const { data: cityExpansionData, isLoading } = useGetCityExpensionQuery({
    limit: 10,
    page: currentPage,
    searchText: searchText,
  });

  // Delete cityExpansion api handler

  const [deleteCityExpansionData, { isLoading: isDeleting }] = useDeleteCityExpensionMutation();

  // Dummy table data
  const data = cityExpansionData?.data?.data?.map((item, inx) => ({
    key: inx + 1,
    name: item?.cityName,
    centralzipcode: item?.centralZipCode,
    radius: item?.radius,
    coveredzipcode: item?.coveredZipCodes.map((item) => item).join(', '),
    status: item?.status,
    _id: item?._id,
  }));

  // Block user handler
  const handleBlockUser = (id) => {
    try {
      const res = deleteCityExpansionData(id).unwrap();
      if (res?.success) {
        toast.success('City deleted successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to delete city');
    }
  };

  // ================== Table Columns ================
  const columns = [
    {
      title: 'City/State',
      dataIndex: 'name',
    },
    {
      title: 'Central Zipcode',
      dataIndex: 'centralzipcode',
      render: (value) => <p className="font-medium">{value}</p>,
    },
    {
      title: 'Radius',
      dataIndex: 'radius',
      render: (value) => <p className="font-medium">{value}</p>,
    },
    {
      title: 'Covered Zipcode',
      dataIndex: 'coveredzipcode',
      render: (value) => <p className="font-medium">{value}</p>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (value) => <Tag color={value === 'active' ? 'green' : 'red'}>{value}</Tag>,
    },
    {
      title: 'Action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-3">
          <Tooltip title=" View And Edit Details">
            <button
              onClick={() => {
                setSelectedCity(record);
                setdetailsModalOpen(true);
              }}
            >
              <Edit color="#1B70A6" size={22} />
            </button>
          </Tooltip>
          <Tooltip title="Delete Service">
            <CustomConfirm
              title="Delete Service"
              description="Are you sure to delete this city ?"
              onConfirm={() => handleBlockUser(record._id)}
              loading={isDeleting}
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
        <div className=" flex w-1/2 ml-auto gap-x-5 mb-3">
          <Input
            placeholder="Search by name "
            prefix={<Search className="mr-2 text-black" size={20} />}
            className="h-11 !border !rounded-lg !text-base"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={() => setaddServiceOpen(true)}
            className="bg-[#5dd3a6] text-white rounded-lg px-4 py-2 w-[200px] text-lg font-medium"
          >
            Create New
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
            total: cityExpansionData?.data?.meta?.total,
            onChange: (page) => setCurrentPage(page),
            showTotal: (total) => `Total ${total} items`,
          }}
        ></Table>
      </ConfigProvider>
      <CityStateExpansionEditModalForm
        open={detailsModalOpen}
        setOpen={setdetailsModalOpen}
        selectedCity={selectedCity}
      />
      <CityStateExpansionAddModalForm open={addServiceOpen} setOpen={setaddServiceOpen} />
    </div>
  );
};

export default CityStateExpansionTable;
