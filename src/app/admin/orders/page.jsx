import { Tabs } from 'antd';
import OrderTable from './_Component/OrderTable';
import BettaryOrderTable from './_Component/BettaryOrderTable';
import EmargencyOrder from './_Component/EmargencyOrder';

export const metadata = {
  title: 'Orders',
  description: 'Orders page',
};
const page = () => {
  return (
    <div className="space-y-5  my-20">
      <Tabs>
        <Tabs.TabPane tab="Fuel Order" key="1">
          <OrderTable orderType="Fuel" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Emercency Fuel Order" key="2">
          <EmargencyOrder orderType="Fuel" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Jump Start Car Battery" key="3">
          <BettaryOrderTable orderType="Battery" />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default page;
