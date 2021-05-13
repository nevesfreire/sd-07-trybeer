import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { getCartItems, getCartTotalPrice } from '../../../utils/localStorage';
import CartList from '../../../components/cartList';

import TopMenu from '../../../commons/simple/TopMenu';

function Checkout() {
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);
  const history = useHistory();
  const PORT = 3000;

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address') {
      return setAddress(value);
    }
    return setNumber(value);
  };
  const isDisabled = () => {
    if (totalCartPrice > 0
      && address.length > 0
      && number.length > 0) {
      return false;
    }
    return true;
  };
  const submitOrder = async () => {
    const productlist = cart.map((cartItem) => ({
      productName: cartItem.name,
      quantity: cartItem.quantity,
    }));
    const token = localStorage.getItem('token');
    const tokenPayload = jwtDecode(token);
    const today = moment().format('YYYY-MM-DD h:mm:ss');
    const order = {
      email: tokenPayload.email,
      price: totalCartPrice,
      address,
      deliveryNumber: number,
      saleDate: today,
      salesStatus: 'Pendente',
      products: productlist,
    };
    console.log(order);
    const request = await axios.post('http://localhost:3001/checkout', order);
    const CREATED = 201;
    if (request.status === CREATED && !requestSuccess) {
      setRequestSuccess(true);
      localStorage.setItem('cart', '[]');
    }
    setIsRedirected(true);
  };
  const redirectTimeOut = () => {
    setTimeout(() => {
      history.push('/products');
    }, PORT);
  };
  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return history.push('/login');
    };
    getToken();
    setCart(getCartItems());
    setTotalCartPrice(getCartTotalPrice());
  }, [history]);

  return (
    <>
      <TopMenu title="Finalizar Pedido" />
      <h3>Produtos</h3>
      <CartList
        cart={ cart }
        setCart={ setCart }
        totalCartPrice={ totalCartPrice }
        setTotalCartPrice={ setTotalCartPrice }
      />
      { isRedirected
        ? (<h1>Compra realizada com sucesso!</h1>)
        : (
          <section>
            <h3>Endereço</h3>
            <label htmlFor="address">
              Rua:
              <input
                type="text"
                name="address"
                data-testid="checkout-street-input"
                value={ address }
                onChange={ handleChange }
              />
            </label>
            <label htmlFor="number">
              Número da casa:
              <input
                type="text"
                name="number"
                data-testid="checkout-house-number-input"
                value={ number }
                onChange={ handleChange }
              />
            </label>
            <button
              type="button"
              data-testid="checkout-finish-btn"
              disabled={ isDisabled() }
              onClick={ submitOrder }
            >
              Finalizar Pedido
            </button>
          </section>
        )}
      { isRedirected && redirectTimeOut() }
    </>
  );
}

export default Checkout;
