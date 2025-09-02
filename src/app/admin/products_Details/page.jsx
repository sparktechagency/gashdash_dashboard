import React from "react";
import ProductDetailsContainer from "./_Component/ProductDetailsContainer";

export const metadata = {
     title: "Products Table",
     description: "Products page",
};

const page = () => {
     return (
          <div>
               {/* <ProductsTable /> */}
               <ProductDetailsContainer />
          </div>
     );
};

export default page;
