import React, { useContext } from 'react';
import { GlobalContext } from '../../services';
import { useLocalStorage } from '../../hooks';

export default function ViewCart() {
  const { productState: { products } } = useContext(GlobalContext);
  const [storage] = useLocalStorage('shoppingCart');

  const total = products.reduce((acc, crr) => {
    if (storage[crr.id]) {
      return ((crr.price * storage[crr.id]) + acc);
    }
    return acc;
  }, 0);

  return (
    <div>
      <button type="button" disabled={!total} data-testid="checkout-bottom-btn">
        Ver carrinho R$<span data-testid="checkout-bottom-btn-value">{ total.toFixed(2) }</span>
      </button>
    </div>
  );
}
