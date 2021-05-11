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
      <span>Ver carrinho </span>
      <span>
        R$
        { total }
      </span>
    </div>
  );
}
