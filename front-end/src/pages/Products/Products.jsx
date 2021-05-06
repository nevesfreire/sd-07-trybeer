import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/* import {Link} from "react-router-dom"; */
import { Creators } from '../../store/ducks/reducers/clientInfo';
import * as API from '../../services/api';
import {
  getStorage,
  setStorage,
  calculateTotalProductsPrice } from '../../services/localStorage';
import { Header, Card } from '../../components';

function Products({ history }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = getStorage('user');
    const cart = getStorage('cart');

    // if (!user) history.push('/');
    if (!cart) {
      API.getProducts().then((data) => {
        setStorage('cart', data);
        setProducts(data);
        setIsLoading(false);
      });
    } else {
      setProducts(cart);
      const totalPrice = calculateTotalProductsPrice(cart);
      dispatch(Creators.changeTotalPrice(totalPrice));
      setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const totalPrice = useSelector((state) => state.client.totalPrice);

  if (isLoading) return <div>Carregando...</div>;

  return (
    <div>
      <Header />
      { products.map((product) => <Card key={ product.id } product={ product } />) }
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        disabled={ totalPrice === 0 }
        onClick={ () => history.push('/checkout') }
      >
        Ver Carrinho
        <span
          data-testid="checkout-bottom-btn-value"
        >
          { totalPrice }
        </span>
      </button>
    </div>
  );
}

export default Products;
