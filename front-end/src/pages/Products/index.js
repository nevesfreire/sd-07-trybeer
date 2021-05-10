import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BeerAppContext from '../../context/BeerAppContext';
import { requestGetProductsAPI } from '../../services';
import ProductCard from '../../component/ProductCard';

function ProductsCards() {
  const {
    totalProducts, 
    products,
    setProducts
  } = useContext(BeerAppContext);
  const history = useHistory();

  const HandleRequestGetProducts = async () => {
    const products = await requestGetProductsAPI();
    const data = products.data;
    if (products.status === 200) setProducts(data);
  };



  useEffect(() => {
    HandleRequestGetProducts();
  }, []);

  if (!products.length) return <h1>LOADING...</h1>;

  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      <button
        type='button'
        data-testid='checkout-bottom-btn'
        onClick={() => history('/checkout')}>
        Ver Carrinho
        <span data-testid='checkout-bottom-btn-value'>{` R$ ${totalProducts}`}</span>
      </button>
    </div>
  );
}

export default ProductsCards;
