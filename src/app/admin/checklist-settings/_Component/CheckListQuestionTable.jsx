'use client';
import { ConfigProvider, Input, Table, Tooltip } from 'antd';
import { Search, Trash } from 'lucide-react';
import React, { useState } from 'react';
import AddCheckListQuestionModal from './AddCheckListQuestionModal';
import {
  useDeleteCheckListQuestionMutation,
  useGetAllCheckListdataQuery,
} from '@/redux/api/checkListApi';
import { toast } from 'sonner';

const CheckListQuestionTable = () => {
  const [addquestionOpen, setAddquestionOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [currentpage, setCurrentPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const { data: checkListData, isLoading } = useGetAllCheckListdataQuery({
    limit: 10,
    page: currentpage,
    searchText,
  });

  const [deleteCheckListQuestion, { isLoading: isDeleteLoading }] =
    useDeleteCheckListQuestionMutation();

  const data = checkListData?.data?.data?.map((item, index) => ({
    id: item?._id,
    serial: index + 1,
    question: item?.text,
    time: new Date(item?.createdAt).toLocaleString(),
  }));

  const handledetelete = async (id) => {
    setDeletingId(id); // Set the id of the item being deleted
    try {
      await deleteCheckListQuestion(id).unwrap();
      toast.success('Question deleted successfully');
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setDeletingId(null);
    }
  };

  const columns = [
    { title: 'Serial', dataIndex: 'serial', render: (value) => `#${value}` },
    { title: 'Question', dataIndex: 'question' },
    { title: 'Time', dataIndex: 'time' },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => (
        <div className="flex-center-start gap-x-2">
          <Tooltip title="Delete Question">
            {deletingId === record.id ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
            ) : (
              <button onClick={() => handledetelete(record.id)}>
                <Trash color="#F16365" size={22} />
              </button>
            )}
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
            <h2 className="text-2xl font-semibold">CheckList</h2>
            <div className="flex w-1/2 ml-auto gap-x-5 mb-3">
              <Input
                placeholder="Search by name or email"
                prefix={<Search className="mr-2 text-black" size={20} />}
                className="h-11 !border !rounded-lg !text-base"
                onChange={(e) => setSearchText(e.target.value)}
              />
              <div>
                <button
                  onClick={() => setAddquestionOpen(true)}
                  className="bg-[#48af99] text-white font-semibold p-1 text-sm rounded-lg w-40 h-10 flex-center-center gap-x-2"
                >
                  Create Question
                </button>
              </div>
            </div>
          </div>
          <Table
            style={{ overflowX: 'auto' }}
            columns={columns}
            dataSource={data}
            scroll={{ x: '100%' }}
            loading={isLoading}
          ></Table>

          <AddCheckListQuestionModal open={addquestionOpen} setOpen={setAddquestionOpen} />
        </div>
      </ConfigProvider>
    </div>
  );
};

export default CheckListQuestionTable;
