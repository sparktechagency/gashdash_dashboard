import CouponCodeContainer from './Component/CuponeCodeComtainer';

export const metadata = {
  title: 'Set Cupon Code',
  description: 'Set Cupon Code page',
  icons: {
    icon: '/favicon.ico',
  },
};

const page = () => {
  return (
    <div className=" space-y-20  min-h-[1100px]">
      <CouponCodeContainer />
    </div>
  );
};

export default page;
