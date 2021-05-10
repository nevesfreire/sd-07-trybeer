import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { fetchProducts } from '../actions';

export default function Products() {
  const INITIAL_VALUE = 0;
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const productsList = useSelector(({ products }) => products);
  const cartList = useSelector(({ cart }) => cart);

  const totalValue = cartList
    .map((item) => item.totalPrice)
    .reduce((acc, next) => acc + next, INITIAL_VALUE);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header title="TryBeer" />
      { shouldRedirect && <Redirect to="/checkout" /> }
      { productsList
        .map((item, index) => <Card key={ item } product={ item } position={ index } />) }
      <div>
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => setShouldRedirect(!shouldRedirect) }
        >
          Ver Carrinho
        </button>
        <span
          data-testid="checkout-bottom-btn-value"
        >
          { `R$ ${totalValue}` }
        </span>
      </div>
    </>
  );
}
