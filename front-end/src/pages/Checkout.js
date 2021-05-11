import React, { useContext } from 'react';
import TrybeerContext from '../store/context';

function Checkout() {
  const { cart } = useContext(TrybeerContext);

  return (
    <div>
      <h2>Produtos</h2>
      {

        Object.keys(cart).map((key) => (
          // const { quantity, item} = cart[key];
          <li key={ key }>
            <span>{cart[key].quantity}</span>
            <br />
            <span>{cart[key].item.name}</span>
            <br />
            <span>{`R$ ${cart[key].item.price}`}</span>
            <br />
          </li>
        ))

      }
    </div>
  );
}

export default Checkout;
