import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GlobalContext } from '../../services';
import { useLocalStorage } from '../../hooks';

import './viewCard.css';

export default function ViewCart() {
  const { productState: { products } } = useContext(GlobalContext);
  const [storage] = useLocalStorage('shoppingCart');
  const history = useHistory();

  const total = products.reduce((acc, crr) => {
    if (storage[crr.id]) {
      return ((crr.price * storage[crr.id]) + acc);
    }
    return acc;
  }, 0);

  return (
    <div className="viewCard">
      <button
        type="button"
        disabled={ !total }
        data-testid="checkout-bottom-btn"
        onClick={ () => history.push('/checkout') }
      >
        Ver Carrinho
      </button>
      <span data-testid="checkout-bottom-btn-value">
        {
          total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
        }
      </span>
    </div>
  );
}
