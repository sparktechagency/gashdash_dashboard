'use client';
import { useGetDashboardDriverDataQuery } from '@/redux/api/dashboardApi';
import { DatePicker } from 'antd';
import moment from 'moment';
import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

const UserOverView = () => {
  const [selectedYear, setSelectedYear] = useState(null);
  const query = {};
  if (selectedYear) {
    query['incomeYear'] = selectedYear;
  }
  const { data: driverData, isLoading } = useGetDashboardDriverDataQuery(query);

  const dummyEarningsData = driverData?.data?.monthlyIncome?.map((item) => ({
    month: item.month,
    earning: item.income,
  }));

  const handleChange = (date, dateString) => {
    setSelectedYear(dateString);
  };

  return (
    <div className="w-full rounded-xl bg-[#ffffff] p-6 xl:w-full">
      <div className="text-black mb-10 flex items-center justify-between">
        <h1 className="text-xl font-medium">Driver Overview</h1>
        <div className="space-x-3">
          {/* Year Picker */}
          <DatePicker
            value={selectedYear ? moment(selectedYear, 'YYYY') : null}
            onChange={handleChange}
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
          <AreaChart data={dummyEarningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                <stop offset="10%" stopColor="#5dd3a6" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#5dd3a6" stopOpacity={0.2} />
              </linearGradient>
            </defs>

            <XAxis tickMargin={10} axisLine={false} tickLine={false} dataKey="month" />

            <YAxis tickMargin={20} axisLine={false} tickLine={false} />

            <CartesianGrid opacity={0.1} stroke="#080E0E" strokeDasharray="3 3" />

            <Tooltip
              formatter={(value) => [`Monthly Income: ${value}`, `Monthly `]}
              contentStyle={{
                color: 'var(--primary-green)',
                fontWeight: '500',
                borderRadius: '5px',
                border: '0',
              }}
              itemStyle={{ color: '#1B70A6' }}
            />

            <Area
              activeDot={{ fill: '#1B70A6' }}
              type="monotone"
              dataKey="earning"
              strokeWidth={0}
              stroke="blue"
              fill="url(#color)"
              fillOpacity={1}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default UserOverView;
