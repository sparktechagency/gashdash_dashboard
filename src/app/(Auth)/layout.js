import Image from 'next/image';
import React from 'react';
import authImage from '@/assets/images/authimage.png';
export default function AuthLayout({ children }) {
  return (
    <main
      className="flex h-screen items-center justify-center relative "
      style={{
        background: "url('/rm222batch2-mind-03.jpg') ",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <div className="absolute top-0 left-0 right-0 bottom-0 w-[100%]">
        <Image src="/Vector.png" alt="background" width={1200} height={1200} />
      </div> */}
      <div className="lg:w-[55%] mx-auto">
        {/* -------------------------------------------logo -------------------------------- */}
        {/* <div className="w-max mx-auto mb-3">
          <LogoSvg />
        </div> */}

        <div className=" flex gap-10 justify-center items-center">
          <div className="bg-white w-full">{children}</div>
          <div>
            <Image className="" src={authImage} alt="background" width={1200} height={1200} />
          </div>
        </div>
      </div>
      {/* <Image
        className=" absolute bottom-0 right-0 w-[600px]"
        src="/bcorner.png"
        alt="background"
        width={1200}
        height={1200}
      ></Image> */}
    </main>
  );
}
