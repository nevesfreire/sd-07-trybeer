import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Creators } from '../../store/ducks/reducers/clientInfo';
import * as API from '../../services/api';
import {
  getStorage,
  setStorage,
  calculateTotalProductsPrice } from '../../services/localStorage';
import { Header, Card } from '../../components';
import format from '../../util/format';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const totalPrice = useSelector((state) => state.client.totalPrice);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    const user = getStorage('user');
    const cart = getStorage('cart');

    if (!user) return history.push('/');
    if (!cart) {
      API.getProducts().then((data) => {
        setStorage('cart', data);
        setProducts(data);
        setIsLoading(false);
      });
    } else {
      setProducts(cart);
      const subtotal = calculateTotalProductsPrice(cart);
      dispatch(Creators.changeTotalPrice(subtotal));
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <div>Carregando...</div>;
  return (
    <div>
      <Header>TryBeer</Header>
      { products.map((product) => <Card key={ product.id } product={ product } />) }
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        disabled={ totalPrice === 0 }
        onClick={ () => history.push('/checkout') }
      >
        Ver Carrinho
        <span data-testid="checkout-bottom-btn-value">
          { format(totalPrice) }
        </span>
      </button>
    </div>
  );
}

export default Products;
