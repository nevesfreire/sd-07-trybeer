import React from 'react';
import Checkout from '../components/Checkout';
import MenuTop from '../components/MenuTop';
import '../style/checkout.css';

function CheckoutPage() {
  return (
    <div className="form-page checkout-page">
      <MenuTop />
      <Checkout />
    </div>
  );
}

export default CheckoutPage;
