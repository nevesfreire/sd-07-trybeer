import React, { useEffect, useState, useCallback } from 'react';

import { ProductCard, Loading } from '../components';
import { getProducts } from '../api';
import acessLocalStorage from '../services';

function Products() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const requestProducts = useCallback(async () => {
    const user = await acessLocalStorage.acessLocalStorage.getUserLocalStorage();
    const resultApi = await getProducts(user.token);
    setproducts(resultApi.data);
    if (resultApi) setLoading(false);
  }, [setproducts]);

  useEffect(() => {
    requestProducts();
  }, [requestProducts]);

  return (
    <div>
      {
        loading ?
        <Loading /> :
        (
          products.map((product, index) => {
            return <ProductCard key={ index } item = { product } index = { index } />
          })
        )
      }
    </div>
  );
}

export default Products;
