import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GlobalContext } from '../../services';

export default function ViewCart({ storage }) {
  const { productState: { products } } = useContext(GlobalContext);

  const total = products.reduce((acc, crr) => {
    if (storage[crr.id]) {
      return ((crr.price * storage[crr.id]) + acc);
    }
    return acc;
  }, 0);

  useEffect(() => {

  }, [storage]);

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

ViewCart.propTypes = {
  storage: PropTypes.shape({}).isRequired,
};
