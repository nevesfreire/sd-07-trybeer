import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Creators } from '../../store/ducks/reducers/clientInfo';
import * as API from '../../services/api';
import {
  getStorage,
  setStorage,
  calculateTotalProductsPrice } from '../../services/localStorage';
import { Products, Checkout } from '../../components';

function ProductsOrCheckout() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const { pathname } = useLocation();
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
      { pathname.contains('products')
        ? <Products products={ products } /> : <Checkout products={ products } /> }
    </div>
  );
}

export default ProductsOrCheckout;
