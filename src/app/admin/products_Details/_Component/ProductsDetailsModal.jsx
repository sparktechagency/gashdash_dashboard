"use client";
import { Modal } from "antd";
import { useState } from "react";
import { Row, Col, Button, Radio, Divider, Image, Space } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Edit } from "lucide-react";

export default function ProductsdetailsModal({ open, setOpen }) {
    const [selectedImage, setSelectedImage] = useState(0);

    const productImages = [
        "/camera.png",
        "/camera.png",
        "/camera.png",
        "/camera.png",
        "/camera.png",
    ];

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    return (
        <Modal
            centered
            open={open}
            setOpen={setOpen}
            footer={null}
            onCancel={() => {
                setOpen(false);
            }}
            width="60%"
            className="rounded-2xl"
        >
            <div className="p-6 bg-gray-50">
                <Row gutter={[24, 24]}>
                    {/* Product Images Section */}
                    <Col xs={24} md={12}>
                        <div className="product-images bg-white p-4 rounded-lg shadow-sm">
                            <Row gutter={[16, 16]}>
                                <Col span={24}>
                                    <Image
                                        src={productImages[selectedImage] || "/placeholder.svg"}
                                        alt="Canon EOS R6 Mirrorless Camera"
                                        style={{ width: "100%", objectFit: "contain" }}
                                        preview={false}
                                    />
                                </Col>
                                <Col span={24}>
                                    <Row gutter={8}>
                                        {productImages.slice(0, 4).map((img, index) => (
                                            <Col span={6} key={index}>
                                                <div
                                                    onClick={() => handleImageClick(index)}
                                                    className={`cursor-pointer p-1 rounded-md transition-all ${selectedImage === index
                                                        ? "border-2 border-blue-500"
                                                        : "border border-gray-200"
                                                        }`}
                                                >
                                                    <Image
                                                        src={img || "/placeholder.svg"}
                                                        alt={`Thumbnail ${index + 1}`}
                                                        style={{ width: "100%", objectFit: "contain" }}
                                                        preview={false}
                                                    />
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Col>
                            </Row>
                        </div>
                    </Col>

                    {/* Product Info Section */}
                    <Col xs={24} md={12}>
                        <div className="product-info bg-white p-6 rounded-lg shadow-sm">
                            {/* Product Category */}
                            <div className="mb-2">
                                <span className="text-gray-500 text-sm font-medium">
                                    Product Category
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                    Canon EOS R6 Mirrorless Camera
                                </h2>
                            </div>

                            <Divider className="my-4" />

                            {/* Name */}
                            <div className="mb-2">
                                <h3 className="text-lg font-medium text-gray-700">Name</h3>
                            </div>
                            <div>
                                <span className="text-gray-600">
                                    Canon EOS R6 Mirrorless Camera
                                </span>
                            </div>

                            <Divider className="my-4" />

                            {/* Price */}
                            <div className="mb-2">
                                <h3 className="text-lg font-medium text-gray-700">Price</h3>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">$500</h2>
                            </div>

                            <Divider className="my-4" />

                            {/* Shipping Cost */}
                            <div className="mb-2">
                                <h3 className="text-lg font-medium text-gray-700">
                                    Shipping Cost
                                </h3>
                            </div>
                            <Space direction="vertical">
                                <div>
                                    <span className="text-gray-600">UK: £x</span>
                                </div>
                                <div>
                                    <span className="text-gray-600">USA: $10</span>
                                </div>
                            </Space>

                            <Divider className="my-4" />

                            {/* Size */}
                            <div className="mb-2">
                                <h3 className="text-lg font-medium text-gray-700">Size</h3>
                            </div>
                            <div className="mb-4">
                                M
                            </div>

                            <Divider className="my-4" />

                            {/* Total Stock */}
                            <div className="mb-2">
                                <h3 className="text-lg font-medium text-gray-700">
                                    Total Stock
                                </h3>
                            </div>
                            <div>
                                <span className="text-gray-600">25</span>
                            </div>

                            <Divider className="my-4" />

                            {/* Description */}
                            <div className="mb-2">
                                <h3 className="text-lg font-medium text-gray-700">
                                    Description
                                </h3>
                            </div>
                            <div>
                                <p className="text-gray-600 mb-2">
                                    The Canon EOS R6 is a full-frame mirrorless camera
                                    designed for high-speed performance and stunning image
                                    quality, making it the perfect choice for avid
                                    photographers. With a 20 frames per second continuous
                                    shooting speed, this camera ensures you won&apos;t miss
                                    any action during fast-paced airsoft games. It also
                                    features in-body image stabilization and high ISO
                                    sensitivity, making it ideal for low-light environments.
                                </p>
                                <p className="text-gray-600">
                                    Whether you&apos;re capturing fast-moving airsoft
                                    players or the intensity of a game, the Canon EOS R6
                                    delivers sharp, vibrant photos with minimal motion blur.
                                </p>
                            </div>

                            <Divider className="my-4" />

                            {/* Edit Product Button */}
                            <div className="w-full">
                                <Button
                                    size="large"
                                    icon={<Edit size={16} />}
                                    className="w-full h-12 text-base font-semibold rounded-lg bg-blue-500 text-white border-none hover:bg-blue-600 transition-all"
                                >
                                    Edit Product
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </Modal>
    );
}