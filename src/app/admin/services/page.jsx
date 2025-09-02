import React from 'react'
import ServiceListTable from './_Component/ServiceListTable'

const page = () => {
  return (
    <div>
        <h1 className="text-2xl font-semibold">Services</h1>
        <div className="mt-5">
            <ServiceListTable />
        </div>
    </div>
  )
}

export default page
