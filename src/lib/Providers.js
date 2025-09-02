'use client';

import { AntdRegistry } from '@ant-design/nextjs-registry';
import { ConfigProvider } from 'antd';
import { mainTheme } from '../theme/mainTheme';
import NextTopLoader from 'nextjs-toploader';
import ReduxProviders from '@/redux/lib/ReduxProvider';

export default function Providers({ children }) {
  return (
    <>
      <AntdRegistry>
        <ReduxProviders>
          <ConfigProvider theme={mainTheme}>{children}</ConfigProvider>
          <NextTopLoader />
        </ReduxProviders>
      </AntdRegistry>
    </>
  );
}
