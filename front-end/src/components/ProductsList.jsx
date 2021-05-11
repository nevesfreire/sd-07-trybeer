import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../services/Api/products';
import ProductCard from './ProductCard';

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then((r) => { console.log(r); setProducts(r); });
  }, []);
  return (
    <div>
      <h1>Página produtos</h1>
      {products && products.map(
        (product, key) => <ProductCard data={ { product, key } } key={ key } />,
      )}
    </div>);
};
export default ProductsList;
