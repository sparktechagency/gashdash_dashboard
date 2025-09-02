"use client";
import { Button, Input, Table } from "antd";
import { Tooltip } from "antd";
import { ConfigProvider } from "antd";
import { PlusCircle, Search, X } from "lucide-react";
import userImage from "@/assets/images/user-avatar-lg.png";
import { Eye } from "lucide-react";
import { useState } from "react";
import CustomConfirm from "@/components/CustomConfirm/CustomConfirm";
import { message } from "antd";
import AddproductModal from "@/components/SharedModals/AddproductModal";
import ProductsdetailsModal from "./ProductsDetailsModal";
// Dummy table Data
const data = Array.from({ length: 50 }).map((_, inx) => ({
    key: inx + 1,
    product: "mobile-device",
    userImg: userImage,
    status: "in stock",
    price: "$500",
    category: "mobile-device",
    stock: "50",
    productType: "mobile",

}));
const VendorUploadedProducts = () => {
    const [searchText, setSearchText] = useState("");
    const [profileModalOpen, setProfileModalOpen] = useState(false);
    const [addProductModalOpen, setShowCreateCategoryModal] = useState(false);

    // Block user handler
    const handleBlockUser = () => {
        message.success("User blocked successfully");
    };

    // ================== Table Columns ================
    const columns = [
        {
            title: "Product ID",
            dataIndex: "key",
            render: (value) => `#${value}`,
        },
        {
            title: "Product Type",
            dataIndex: "productType",
        },
        {
            title: "Product Name",
            dataIndex: "product",
        },
        {
            title: "Price",
            dataIndex: "price",
        },
        {
            title: "Stock quantity",
            dataIndex: "stock",
        },

        {
            title: "Action",
            render: () => (
                <div className="flex-center-start gap-x-3">
                    <Tooltip title="Show Details">
                        <button onClick={() => setProfileModalOpen(true)}>
                            <Eye color="#1B70A6" size={22} />
                        </button>
                    </Tooltip>

                    <Tooltip title="Delete Product">
                        <CustomConfirm
                            title="Delete Product"
                            description="Are you sure to Delete this product?"
                            onConfirm={handleBlockUser}>
                            <button>
                                <X color="#F16365" size={22} />
                            </button>
                        </CustomConfirm>
                    </Tooltip>
                </div>
            ),
        },
    ];

    return (
        <div>
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: "#1B70A6",
                        colorInfo: "#1B70A6",
                    },
                }}>
                <div className="flex w-1/3 ml-auto gap-x-5 mb-3">
                    <Input
                        placeholder="Search by Product Name"
                        prefix={
                            <Search className="mr-2 text-black" size={20} />
                        }
                        className="h-11 !border !rounded-lg !text-base"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>

                <Table
                    style={{ overflowX: "auto" }}
                    columns={columns}
                    dataSource={data}
                    scroll={{ x: "100%" }}></Table>

                <ProductsdetailsModal
                    open={profileModalOpen}
                    setOpen={setProfileModalOpen}
                />
                <AddproductModal
                    open={addProductModalOpen}
                    setOpen={setShowCreateCategoryModal}
                />
            </ConfigProvider>
        </div>
    )
}

export default VendorUploadedProducts
