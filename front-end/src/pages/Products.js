import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import Card from '../components/Card';
import { fetchProducts } from '../actions';

function Products() {
  const INITIAL_VALUE = 0;
  const ROUNDING_OPTION = 2;
  const [shouldRedirect, setShouldRedirect] = useState('');
  const productsList = useSelector(({ products }) => products);
  const cartList = useSelector(({ cart }) => cart.cart);
  const user = JSON.parse(localStorage.getItem('user'));

  const totalValue = cartList
    .map((item) => item.totalPrice)
    .reduce((acc, next) => acc + next, INITIAL_VALUE);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts(user.token));
  }, [dispatch, user]);

  return (
    <>
      <Header title="TryBeer" />
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      { (productsList.error || !user) && setShouldRedirect('/login')
        && localStorage.removeItem('user') }
      { productsList.products
        .map((item, i) => <Card key={ i } product={ item } position={ i } />) }
      <div>
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => setShouldRedirect('/checkout') }
        >
          Ver Carrinho
        </button>
        <span
          data-testid="checkout-bottom-btn-value"
        >
          { `R$ ${totalValue.toFixed(ROUNDING_OPTION)}` }
        </span>
      </div>
    </>
  );
}

export default Products;
