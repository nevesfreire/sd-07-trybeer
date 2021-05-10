import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TrybeerContext from '../context';

function Provider({ children }) {
  const [cart, setCart] = useState([]);

  // const addProductsToCart = async (product, qtt) => {
  // const teste = await cart.reduce((object, item) => {
  //   let product = item.id;
  //   console.log('Product', product);

  //     if ( !object[product] ) {
  //       object[product].qtt = 1;
  //     } else {
  //       object[product].qtt += 1;
  //     }
  //   console.log('Object', object);
  //   return object;
  // },{});
  // console.log(teste);
  // };

  const contextValue = {
    cart,
    setCart,
  };

  return (
    <TrybeerContext.Provider
      value={ contextValue }
    >
      {children}
    </TrybeerContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.element.isRequired };

export default Provider;
