import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import services from '../../services';

import TrybeerContext from '../context';

function Provider({ children }) {
  const [cart, setCart] = useState({});

  const addToCart = (item) => {
    setCart((old) => {
      let quantity = 0;
      if (old && old[item.id]) {
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
    // const inlocal = services.acessLocalStorage.getCartLocalStorage();
    const alreadyInTheCart = Object.keys(cart).some((id) => id === item.id.toString());
    // console.log('inLocal', inlocal);
    // console.log('itemID', item.id.toString());
    // console.log(alreadyInTheCart, cart, item.id.toString());
    if (alreadyInTheCart) {
      setCart((old) => {
        let newCart;
        if (old[item.id].quantity >= 0) {
          newCart = {
            ...old,
            [item.id]: {
              quantity: old[item.id].quantity - 1,
              item,
            },
          };
          if (newCart[item.id].quantity === 0) {
            console.log(newCart[item.id].quantity);
            delete newCart[item.id];
            console.log(newCart);
          }
        }
        services.acessLocalStorage.setCartLocalStorage(newCart);
        return newCart;
      });
    }
  };

  /* Rever lógica \/ - 12/05
   const removeToCart = (item) => {

    setCart((old) => {
      // console.log(cart);
      let newCart = {};
      // console.log('item', old[item.id].quantity);
      if (old[item.id].quantity > 0) {
        newCart = {
          ...old,
          [item.id]: {
            quantity: old[item.id].quantity - 1,
            item,
          },
        };
        services.acessLocalStorage.setCartLocalStorage(newCart);
        return newCart;
      }
      Object.keys(old).forEach((id) => {
        if (id !== item.id) {
          newCart[id] = old[id];
        }// console.log(id);
        console.log('n >>>>', old);
      });
      services.acessLocalStorage.setCartLocalStorage(newCart);
      return newCart;
    });
  }; */

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
