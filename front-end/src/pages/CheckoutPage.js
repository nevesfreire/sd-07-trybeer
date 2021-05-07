import React from 'react';
import Checkout from '../components/Checkout';
import MenuTop from '../components/MenuTop';

function CheckoutPage() {
  return (
    <div className="form-page">
      <MenuTop />
      <Checkout />
    </div>
  );
}

export default CheckoutPage;
