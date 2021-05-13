import React, { useState } from 'react';
import { useHistory } from 'react-router';
import TopBar from '../../Components/TopBar';
import CheckoutProducts from '../../Components/CheckoutProducts';
import CheckoutForm from '../../Components/CheckoutForm';

const Checkout = () => {
  const history = useHistory();
  const [showMessage, setShowMessage] = useState(false);
  const twoSec = 2000;

  const finishSale = () => {
    setShowMessage(true);
    setTimeout(() => {
      history.push('/products');
    }, twoSec);
  };

  return (
    <div>
      <TopBar />
      { showMessage ? (
        <div style={ { marginTop: '100px' } }>Compra realizada com sucesso!</div>
      ) : (
        <div>
          <CheckoutProducts />
          <CheckoutForm finishSale={ finishSale } />
        </div>
      )}
    </div>
  );
};

export default Checkout;
