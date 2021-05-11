import React, { useContext } from 'react';
import TrybeerContext from '../store/context';

function Checkout() {
  const { cart } = useContext(TrybeerContext);

  return (
    <div>
      <pre>{JSON.stringify(cart, null, 2)}</pre>
      {console.log(cart)}
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
            <prev>{JSON.stringify(cart[key])}</prev>
          </li>
        ))

      }
    </div>
  );
}

export default Checkout;
