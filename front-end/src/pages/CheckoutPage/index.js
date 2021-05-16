import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../context';

import CheckoutForm from './CheckoutForm';
import { ClientMenu, CheckoutPdtCard } from '../../components';

import './styles.css';

function Checkout() {
  const [isLoading, setIsLoading] = useState(true);

  const { cart, totalPrice } = useContext(Context);

  const formatedTotalPrice = `R$ ${totalPrice.replace(/\./g, ',')}`;

  useEffect(() => {
    if (cart.length > 0) setIsLoading(false);
  }, [cart]);

  return isLoading ? <h1 className="loading">Carregando</h1> : (
    <>
      <ClientMenu />
      <section className="checkout-container">
        <section className="checkout-cart-container">
          {cart.length === 0 ? <h2>Não há produtos no carrinho</h2>
            : cart.map((prd, i) => (<CheckoutPdtCard
              key={ prd.id }
              data={ prd }
              index={ i }
            />))}
          <div className="checkout-total">
            <h1>Total:</h1>
            <h1 data-testid="order-total-value">{ formatedTotalPrice }</h1>
          </div>
        </section>
        <CheckoutForm />
      </section>
    </>
  );
}

export default Checkout;
