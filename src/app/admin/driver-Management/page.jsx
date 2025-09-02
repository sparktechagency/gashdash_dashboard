import React from 'react';
import DriverDetailsTable from './_Component/DriverTable';

export const metadata = {
  title: 'Driver Management',
  description: 'Driver Management page',
};
const page = () => {
  return (
    <div>
      <DriverDetailsTable />
    </div>
  );
};

export default page;
