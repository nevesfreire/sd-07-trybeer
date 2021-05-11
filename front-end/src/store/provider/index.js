import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import services from '../../services';

import TrybeerContext from '../context';

function Provider({ children }) {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((old) => {
      let quantity = 0;
      if (old[item.id]) {
        quantity = old[item.id].quantity;
      }
      const newCart = {
        ...old,
        [item.id]: {
          quantity: quantity + 1,
          item,
        },
      };
      services.acessLocalStorage.setCartLocalStorage(newCart);
      return newCart;
    });
  };

  const removeToCart = (item) => {
    if (item.lenght === 1) {
      setCart((old) => {
        let quantity = 0;
        let newCart;
        if (old[item.id]) {
          quantity = old[item.id].quantity;
        }

        if (old[item.id] && old[item.id].quantity > 0) {
          newCart = {
            ...old,
            [item.id]: {
              quantity: quantity - 1,
              item,
            },
          };
        }
        services.acessLocalStorage.setCartLocalStorage(newCart);
        return newCart;
      });
    }
  };

  useEffect(() => {
    const cartLocal = services.acessLocalStorage.getCartLocalStorage();
    if (cartLocal) {
      setCart(cartLocal);
    }
  }, []);

  /*  const addToCart = (product) => {
    let quantity = 0;
    if (old[product.id]) {
      quantity = old[product.id].quantity;
    }
    const newCart = {
      ...old,
      [product.id]: {
        quantity: quantity + 1,
        product,
      },
    };
    window.localStorage.setItem('cart', JSON.stringify(newCart));
  }; */

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
  // Att carrinho no local storage e no cart no botão mostrar o total.
  // };

  const contextValue = {
    cart,
    setCart,
    addToCart,
    removeToCart,
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
