import React, { useState, useEffect } from 'react';

import TopMenu from '../../../commons/simple/TopMenu';
import ProductsCard from '../../../components/productsCard'
import getProductsRequest from '../../../services/productsApi';


// useEffect (() => {
//   const renderProducts = async() => {
//     const result = await getProductsRequest();
//     console.log(result);
//   }
//   renderProducts()
// }, [])
function Products() {

  return (
    <>
      <TopMenu title="Trybeer" />
      <h1>Product Screen</h1>
      <ProductsCard />
    </>
  );
}

export default Products;
