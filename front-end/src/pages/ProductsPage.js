import React from 'react';
import Products from '../components/Products';
import MenuTop from '../components/MenuTop';
import '../style/products.css';

function ProductsPage() {
  return (
    <div className="form-page products-page">
      <MenuTop />
      <Products />
    </div>
  );
}

export default ProductsPage;
