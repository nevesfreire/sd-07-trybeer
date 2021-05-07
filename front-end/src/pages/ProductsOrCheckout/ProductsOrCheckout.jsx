import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { Creators } from '../../store/ducks/reducers/clientInfo';
import * as API from '../../services/api';
import { getStorage, setStorage } from '../../services/localStorage';
import { Products, Checkout } from '../../components';

function ProductsOrCheckout() {
  const [isLoading, setIsLoading] = useState(true);
  const products = useSelector((state) => state.client.cart);
  const checkouted = useSelector((state) => state.client.checkouted);

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
        dispatch(Creators.updateCart(data));
        setIsLoading(false);
      });
    } else {
      dispatch(Creators.updateCart(cart));
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkouted]);

  if (isLoading) return <div>Carregando...</div>;
  return pathname.includes('products')
    ? <Products products={ products } /> : <Checkout products={ products } />;
}

export default ProductsOrCheckout;
