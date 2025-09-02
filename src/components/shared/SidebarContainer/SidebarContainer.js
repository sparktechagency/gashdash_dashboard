'use client';
import { logout } from '@/redux/features/authSlice';
import './Sidebar.css';
import logo from '@/assets/images/logo.png';
import { Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import {
  Car,
  CheckCheck,
  CircleArrowOutUpLeft,
  CircleDollarSign,
  Cog,
  DollarSign,
  HandPlatter,
  MailPlus,
  MessageSquareMore,
  School,
  ShoppingCart,
  Timer,
  WalletMinimal,
} from 'lucide-react';
import { ScrollText } from 'lucide-react';
import { LogOut } from 'lucide-react';
import { SlidersVertical } from 'lucide-react';
import { CircleUser } from 'lucide-react';
import { House } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const SidebarContainer = ({ collapsed }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // Logout handler
  const onClick = (e) => {
    if (e.key === 'logout') {
      dispatch(logout());
      router.refresh();
      router.push('/login');

      toast.success('Logout successful');
    }

    console.log('logout success');
  };

  const navLinks = [
    {
      key: 'dashboard',
      icon: <House size={21} strokeWidth={2} />,
      label: <Link href={'/admin/dashboard'}>Dashboard</Link>,
    },
    {
      key: 'account-details',
      icon: <CircleUser size={21} strokeWidth={2} />,
      label: <Link href={'/admin/account-details'}>Accounts Details</Link>,
    },
    {
      key: 'checklist-settings',
      icon: <CheckCheck size={21} strokeWidth={2} />,

      label: <Link href={'/admin/checklist-settings'}>CheckList Settings</Link>,
    },
    {
      key: 'products-details',
      icon: <Car size={21} strokeWidth={2} />,
      label: <Link href={'/admin/driver-Management'}>Driver Management</Link>,
    },
    {
      key: 'services',
      icon: <HandPlatter size={21} strokeWidth={2} />,
      label: <Link href={'/admin/services'}>Services</Link>,
    },
    {
      key: 'city-State-Expansion',
      icon: <School size={21} strokeWidth={2} />,
      label: <Link href={'/admin/city-State-Expansion'}>City/State Expansion</Link>,
    },
    {
      key: 'adjust-Business-Hour',
      icon: <Timer size={21} strokeWidth={2} />,
      label: <Link href={'/admin/adjust-Business-Hour'}>Adjust Business Hour</Link>,
    },
    {
      key: 'pricing-adjustment',
      icon: <DollarSign size={21} strokeWidth={2} />,
      label: <Link href={'/admin/pricing-adjustment'}>Pricing Adjustment</Link>,
    },
    {
      key: 'manage-subscription',
      icon: <WalletMinimal size={21} strokeWidth={2} />,
      label: <Link href={'/admin/manage-subscription'}>Manage-Subscription</Link>,
    },
    {
      key: 'manage-cupon',
      icon: <Cog size={21} strokeWidth={2} />,
      label: <Link href={'/admin/setCuponCode'}>Set Cupon Code</Link>,
    },

    {
      key: 'orders',
      icon: <ShoppingCart size={21} strokeWidth={2} />,
      label: <Link href={'/admin/orders'}>Order Management </Link>,
    },
    {
      key: 'withdraw-request',
      icon: <CircleArrowOutUpLeft size={21} strokeWidth={2} />,
      label: <Link href={'/admin/withdraw-request'}>Withdraw Request </Link>,
    },
    {
      key: 'earnings',
      icon: <CircleDollarSign size={21} strokeWidth={2} />,
      label: <Link href={'/admin/earnings'}>Transactions</Link>,
    },
    // {
    //   key: 'messages',
    //   icon: <MessageSquareMore size={21} strokeWidth={2} />,
    //   label: <Link href={'/admin/message'}>Support Messages</Link>,
    // },
    {
      key: 'sendEmail',
      icon: <MailPlus size={21} strokeWidth={2} />,
      label: <Link href={'/admin/sendEmail'}>Send Email</Link>,
    },

    {
      key: 'settings',
      icon: <SlidersVertical size={21} strokeWidth={2} />,
      label: 'Settings',
      children: [
        {
          key: 'privacy-policy',
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/privacy-policy">Privacy Policy</Link>,
        },
        {
          key: 'terms-conditions',
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/terms-conditions">Terms & Conditions</Link>,
        },
        {
          key: 'upload-image',
          icon: <ScrollText size={21} strokeWidth={2} />,
          label: <Link href="/admin/uploadImage">Upload Image</Link>,
        },
      ],
    },

    {
      key: 'logout',
      icon: <LogOut size={21} strokeWidth={2} />,
      label: <Link href="/login">Logout</Link>,
    },
  ];

  // Get current path for sidebar menu item `key`
  const currentPathname = usePathname()?.replace('/admin/', '')?.split(' ')[0];
  return (
    <Sider
      width={320}
      theme="light"
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        paddingInline: `${!collapsed ? '10px' : '4px'}`,
        paddingBlock: '30px',
        backgroundColor: '#FFFFFF',
        maxHeight: '100vh',
        overflow: 'auto',
      }}
      className="scroll-hide h-screen sticky top-0 z-50"
    >
      <div className="mb-6 flex flex-col justify-center items-center gap-y-5">
        <Link href={'/'}>
          {collapsed ? (
            // Logo small
            <Image src={logo} alt="Logo Of Before After Story" className="h-4 w-auto" />
          ) : (
            <Image src={logo} alt="Logo Of Before After Story" className="h-16 w-auto" />
          )}
        </Link>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={[currentPathname]}
        mode="inline"
        className="sidebar-menu !bg-transparent space-y-2.5 !border-none"
        items={navLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
