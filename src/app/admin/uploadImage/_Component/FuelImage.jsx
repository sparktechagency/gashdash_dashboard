'use client';

import { useRef, useState } from 'react';
import { useGetImagesQuery, useUpdateImageMutation } from '@/redux/api/uploadImageApi';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { toast } from 'sonner';
import { Button, Spin } from 'antd';

const FuelImage = () => {
  const emergencyFileInputRef = useRef(null);
  const discountFileInputRef = useRef(null);
  const fuelTypeFileInputRef = useRef(null);
  const orderHistoryFileInputRef = useRef(null);
  const [selectedEmergencyImage, setSelectedEmergencyImage] = useState(null);
  const [selectedDiscountImage, setSelectedDiscountImage] = useState(null);
  const [selectedFuelTypeImage, setSelectedFuelTypeImage] = useState(null);
  const [selectedOrderHistoryImage, setSelectedOrderHistoryImage] = useState(null);

  // get images from api
  const { data, isLoading } = useGetImagesQuery();

  // update image
  const [updateImage, { isLoading: updating }] = useUpdateImageMutation();

  // Handle loading state
  if (isLoading) {
    return (
      <div>
        <div className="flex justify-center p-5">
          <Spin tip="Loading images..." />
        </div>
      </div>
    );
  }

  // Extract the first item from the data array
  const images = data?.data?.[0];

  const handleEmergencyImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedEmergencyImage(file);
    }
  };

  const handleDiscountImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedDiscountImage(file);
    }
  };

  const handleFuelTypeImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFuelTypeImage(file);
    }
  };

  const handleOrderHistoryImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedOrderHistoryImage(file);
    }
  };

  const triggerEmergencyFileInput = () => {
    emergencyFileInputRef.current?.click();
  };

  const triggerDiscountFileInput = () => {
    discountFileInputRef.current?.click();
  };

  const triggerFuelTypeFileInput = () => {
    fuelTypeFileInputRef.current?.click();
  };

  const triggerOrderHistoryFileInput = () => {
    orderHistoryFileInputRef.current?.click();
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      if (selectedEmergencyImage) {
        formData.append('emergencyFuelBanner', selectedEmergencyImage);
      }
      if (selectedDiscountImage) {
        formData.append('discountBanner', selectedDiscountImage);
      }
      if (selectedFuelTypeImage) {
        formData.append('fuelTypeBanner', selectedFuelTypeImage);
      }
      if (selectedOrderHistoryImage) {
        formData.append('orderHistoryBanner', selectedOrderHistoryImage);
      }
      const res = await updateImage(formData).unwrap();
      if (res?.success) {
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      toast.error(error?.data?.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit} className="flex  gap-5">
      {images?.emergencyFuelBanner && (
        <div className="relative w-[500px]">
          <h1 className="text-xl font-semibold mb-3">Emergency Fuel Banner</h1>
          <Image
            src={
              selectedEmergencyImage
                ? URL.createObjectURL(selectedEmergencyImage)
                : images.emergencyFuelBanner || ''
            }
            alt="Emergency Fuel Banner"
            width={400}
            height={400}
            style={{ objectFit: 'cover' }}
          />
          <input
            type="file"
            accept="image/*"
            ref={emergencyFileInputRef}
            onChange={handleEmergencyImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerEmergencyFileInput}
            className="bg-[#e6ce67] p-2 aspect-square rounded-full flex-center text-white/95 absolute bottom-0 right-0"
          >
            <ImagePlus size={25} />
          </button>
        </div>
      )}
      {images?.discountBanner && (
        <div className="relative w-[500px]">
          <h1 className="text-xl font-semibold mb-3">Discount Banner</h1>
          <Image
            src={
              selectedDiscountImage
                ? URL.createObjectURL(selectedDiscountImage)
                : images.discountBanner || ''
            }
            alt="Discount Banner"
            width={400}
            height={400}
            style={{ objectFit: 'cover' }}
          />
          <input
            type="file"
            accept="image/*"
            ref={discountFileInputRef}
            onChange={handleDiscountImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerDiscountFileInput}
            className="bg-[#e6ce67] p-2 aspect-square rounded-full flex-center text-white/95 absolute bottom-0 right-0"
          >
            <ImagePlus size={25} />
          </button>
        </div>
      )}
      {images?.fuelTypeBanner !== null && (
        <div className="relative w-[500px]">
          <h1 className="text-xl font-semibold mb-3">Fuel Type Banner</h1>
          <Image
            src={
              selectedFuelTypeImage
                ? URL.createObjectURL(selectedFuelTypeImage)
                : images.fuelTypeBanner || ''
            }
            alt="Fuel Type Banner"
            width={400}
            height={400}
            style={{ objectFit: 'cover' }}
          />
          <input
            type="file"
            accept="image/*"
            ref={fuelTypeFileInputRef}
            onChange={handleFuelTypeImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerFuelTypeFileInput}
            className="bg-[#e6ce67] p-2 aspect-square rounded-full flex-center text-white/95 absolute bottom-0 right-0"
          >
            <ImagePlus size={25} />
          </button>
        </div>
      )}
      {images?.orderHistoryBanner !== null && (
        <div className="relative w-[500px]">
          <h1 className="text-xl font-semibold mb-3">Order History Banner</h1>
          <Image
            src={
              selectedOrderHistoryImage
                ? URL.createObjectURL(selectedOrderHistoryImage)
                : images.orderHistoryBanner || ''
            }
            alt="Order History Banner"
            width={400}
            height={400}
            style={{ objectFit: 'cover' }}
          />
          <input
            type="file"
            accept="image/*"
            ref={orderHistoryFileInputRef}
            onChange={handleOrderHistoryImageUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={triggerOrderHistoryFileInput}
            className="bg-[#e6ce67] p-2 aspect-square rounded-full flex-center text-white/95 absolute bottom-0 right-0"
          >
            <ImagePlus size={25} />
          </button>
        </div>
      )}
      <Button htmlType="submit" type="primary" loading={updating}>
        Submit
      </Button>
    </form>
  );
};

export default FuelImage;
