import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import ProductsList from '../components/ProductsList';
import { BeerContext } from '../context/BeerContext';

const Products = () => {
  const { cart } = useContext(BeerContext);
  const { push } = useHistory();

  const [localCart, setLocalCart] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem('cart'));
    console.log(localValue);
    if (!localValue === undefined || !localValue === null) {
      return localValue;
    }
    return ({ 0: { product: { price: 0 }, quantity: 0 } });
  });

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('cart'))) {
      setLocalCart(JSON.parse(localStorage.getItem('cart')));
      console.log(localCart)
    }
  }, [cart]);

  const value = Object.values(localCart).reduce((t, { quantity, product }) => {
    if (!Number.isNaN(parseFloat(product.price))) {
      console.log(`${t}isthis`, quantity, product.price);
      return t + quantity * parseFloat(product.price);
    }
    return 0;
  }, 0);

  const accPrice = parseFloat(value).toFixed(2).toString().replace('.', ',');

  return (
    <div>
      <Header />
      <h1>Página produtos</h1>
      <ProductsList />
      <button
        onClick={ () => push('/checkout') }
        type="button"
        disabled={ !value > 0 }
        data-testid="checkout-bottom-btn"
      >
        {`Ver Carrinho R$ ${accPrice}`}
      </button>
      <p data-testid="checkout-bottom-btn-value">
        {`R$ ${accPrice}`}
      </p>

    </div>);
};

export default Products;

