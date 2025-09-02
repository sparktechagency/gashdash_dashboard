import React from 'react';
import CheckListTable from './_Component/CheckListTable';
import { Tabs } from 'antd';
import CheckListQuestionTable from './_Component/CheckListQuestionTable';

const page = () => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Checklist Questions" key="1">
          <CheckListQuestionTable />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Cheklist history" key="2">
          <CheckListTable />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default page;
