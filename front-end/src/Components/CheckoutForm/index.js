import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';
import TryBeerContext from '../../context/TryBeerContext';
import { addSale } from '../../servicesAPI/api';

const CheckoutForm = ({ finishSale }) => {
  const zero = 0;
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const { totalPrice } = useContext(TryBeerContext);

  const checkoutSubmit = async () => {
    const LSCart = JSON.parse(localStorage.getItem('cart'));
    const products = LSCart.filter(({ quantity }) => quantity > zero);

    const dataSale = {
      total_price: parseFloat(totalPrice),
      delivery_address: address,
      delivery_number: houseNumber,
      products,
    };
    console.log(dataSale);
    const { data: { token } } = JSON.parse(localStorage.getItem('user'));

    await addSale(dataSale, token);
    localStorage.removeItem('cart');
    localStorage.removeItem('totalCartPrice');
    finishSale();
  };

  return (
    <form>
      <label htmlFor="checkout-street-input">
        Rua:
        <input
          id="checkout-street-input"
          data-testid="checkout-street-input"
          onChange={ (e) => setAddress(e.target.value) }
        />
      </label>
      <label htmlFor="checkout-house-number-input">
        Número da casa:
        <input
          id="checkout-house-number-input"
          data-testid="checkout-house-number-input"
          onChange={ (e) => setHouseNumber(e.target.value) }
        />
      </label>
      <button
        data-testid="checkout-finish-btn"
        type="button"
        disabled={ !address || !houseNumber || !Number(totalPrice) }
        onClick={ checkoutSubmit }
      >
        Finalizar Pedido
      </button>
    </form>
  );
};

CheckoutForm.propTypes = {
  finishSale: PropTypes.func.isRequired,
};

export default CheckoutForm;
