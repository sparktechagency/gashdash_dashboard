import { Tabs } from 'antd';
import AccDetailsTable from './_components/AccDetailsTable';
import DriverAccDetailsTable from './_components/DriverAccDetailsTable';

export const metadata = {
  title: 'Account Details',
  description: 'User account details page',
};

export default function AccountDetailsPage() {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Customers" key="1">
          <AccDetailsTable accountType="Customer" />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Drivers" key="3">
          <DriverAccDetailsTable accountType="Driver" />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}
