import { Tabs } from 'antd'
import React from 'react'
import ProductsTable from './ProductsTable'
import VendorUploadedProducts from './VendorUploadedProducts'

const { TabPane } = Tabs
const ProductDetailsContainer = () => {
    return (
        <div>
            <h1 className='text-2xl font-bold  my-4'>
                Product List
            </h1>
            <div>
                <Tabs>
                    <Tabs.TabPane tab="My Products" key="1">
                        {/* Products Table Component */}
                        <div className='bg-white p-4 rounded-lg shadow-md'>
                            <ProductsTable />
                        </div>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Vendors Product" key="2">
                        {/* Add Product Form Component */}
                        <div className='bg-white p-4 rounded-lg shadow-md'>
                            <VendorUploadedProducts />
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </div>
    )
}

export default ProductDetailsContainer
