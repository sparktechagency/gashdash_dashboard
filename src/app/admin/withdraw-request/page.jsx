import React from 'react';
import WithdrawReqTable from './_Component/WithdrawReq';

export const metadata = {
  title: 'Withdraw Request',
  description: 'Withdraw Request',
};
const page = () => {
  return (
    <div>
      <WithdrawReqTable />
    </div>
  );
};

export default page;
