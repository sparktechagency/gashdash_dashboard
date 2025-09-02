'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { DatePicker, Select } from 'antd';
import moment from 'moment';
import { useGetDashboardUserDataQuery } from '@/redux/api/dashboardApi';

const { Option } = Select;

const CustomerOverview = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedRole, setSelectedRole] = useState(null);
  const query = {};
  if (selectedRole) {
    query['role'] = selectedRole;
  }
  if (selectedYear) {
    query['joinYear'] = selectedYear;
  }
  const { data: userData, isLoading } = useGetDashboardUserDataQuery(query);
  // Map data for chart
  const data = userData?.data?.monthlyUsers?.map((item) => ({
    month: item.month,
    user: item.total,
  }));

  const handleYearChange = (value) => {
    setSelectedYear(value ? moment(value).format('YYYY') : null);
  };

  const handleRoleChange = (value) => {
    setSelectedRole(value);
  };

  return (
    <div className="rounded-xl p-6 w-full xl:w-full bg-white shadow-md">
      <div className="flex lg:flex-wrap xl:flex-nowrap justify-between items-center mb-10 gap-2">
        <h1 className="text-xl font-medium">User Overview</h1>
        <div className="flex gap-3 items-center">
          {/* Role Dropdown */}
          <Select
            value={selectedRole}
            onChange={handleRoleChange}
            placeholder="Select Role"
            style={{ width: 120 }}
            allowClear
          >
            <Option value="user">User</Option>
            <Option value="driver">Driver</Option>
          </Select>
          {/* Year Picker */}
          <DatePicker
            value={selectedYear ? moment(selectedYear, 'YYYY') : null}
            onChange={handleYearChange}
            picker="year"
            placeholder="Select Year"
            style={{ width: 120 }}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin border-primary-blue"></div>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }} barSize={20}>
            {/* Define Gradient */}
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5dd3a6" stopOpacity={1} />
                <stop offset="100%" stopColor="#5dd3a6" stopOpacity={1} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="month"
              scale="point"
              padding={{ left: 10, right: 10 }}
              tickMargin={10}
              tickLine={false}
              axisLine={false}
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={20} />

            <Tooltip
              formatter={(value) => [`Monthly joined: ${value}`]}
              contentStyle={{
                color: 'var(--primary-green)',
                fontWeight: '500',
                borderRadius: '5px',
                border: '0',
              }}
            />

            <CartesianGrid
              opacity={0.2}
              horizontal={true}
              vertical={false}
              stroke="#080E0E"
              strokeDasharray="3 3"
            />

            <Bar
              barSize={30}
              radius={5}
              background={false}
              dataKey="user"
              fill="url(#colorGradient)"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default CustomerOverview;
