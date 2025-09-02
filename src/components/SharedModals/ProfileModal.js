'use client';

import { Modal } from 'antd';
import Image from 'next/image';
import { Tag } from 'antd';

export default function ProfileModal({ open, setOpen, userData }) {
  const name = userData?.name;

  // Helper function to validate URL
  const isValidUrl = (url) => {
    if (!url) return false;
    return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
  };

  // Determine if the image is valid
  const hasValidImage = isValidUrl(userData?.userImg);

  // Get the first letter of the name (uppercase)
  const firstLetter = name ? name.charAt(0).toUpperCase() : '';

  return (
    <Modal
      centered
      open={open}
      setOpen={setOpen}
      footer={null}
      onCancel={() => {
        setOpen(false);
      }}
    >
      <div className="flex flex-col items-center gap-4 rounded-lg bg-primary-blue py-4">
        {hasValidImage ? (
          <Image
            src={userData?.userImg}
            alt="User avatar"
            width={40}
            height={40}
            className="rounded-full w-40 h-auto aspect-square"
          />
        ) : (
          <div className="flex items-center justify-center rounded-full w-[100px] h-[100px] bg-[#9bddbe] text-white text-xl font-medium">
            {firstLetter}
          </div>
        )}

        <h4 className="text-3xl font-bold text-white">{userData?.name}</h4>
      </div>

      <div className=" grid grid-cols-1 gap-7 px-12 py-8 md:grid-cols-2 ">
        <div className="text-black">
          <h5 className=" font-bold">Name</h5>
          <p className="font-dmSans text-base">{userData?.name}</p>
        </div>
        <div className="text-black">
          <h5 className=" font-bold">Email</h5>
          <p className="font-dmSans text-base">{userData?.email}</p>
        </div>
        <div className="text-black">
          <h5 className=" font-bold">Contact</h5>
          <p className="font-dmSans text-base">{userData?.contact}</p>
        </div>
        <div className="text-black">
          <h5 className=" font-bold">Account Type</h5>
          <p className="font-dmSans">
            <Tag color="cyan" className="!text-sm !mt-1 !font-semibold">
              {userData?.accountType}
            </Tag>
          </p>
        </div>
        <div className="text-black">
          <h5 className=" font-bold">Address</h5>
          <p className="font-dmSans">{userData?.address}</p>
        </div>
      </div>
    </Modal>
  );
}
