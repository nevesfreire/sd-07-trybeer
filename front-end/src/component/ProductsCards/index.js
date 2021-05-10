import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { requestGetProductsAPI } from '../../services';
import ProductCard from '../ProductCard';

function ProductsCards() {
  const [products, setProducts] = useState([]);
  const [productsPrice, setProductsPrice] = useState(0);
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
        <ProductCard product={product} />
      ))}
      <button
        type='button'
        data-testid="checkout-bottom-btn"
        onClick={() => history('/checkout')}
      >
        Ver Carrinho
        <span data-testid="checkout-bottom-btn-value">{` R$ ${productsPrice}`}</span>
      </button>
    </div>
  );
}

export default ProductsCards;
