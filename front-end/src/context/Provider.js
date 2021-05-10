import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from './BeerAppContext';
import { setToLocalStorage, getToLocalStorageShopCart, getToLocalStorage  } from '../utils/localStorage';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [shopCart, setShopCart] = useState([]);

  const addProductQtd = (id, price) => {
    let product = shopCart.findIndex((product) => product.id === id);
    let updateList = [ ...shopCart ];
    if (product > -1) {
      updateList[product].qtd += 1;
    } else {
      updateList.push({ id, qtd: 1, price });
    }
    setShopCart(updateList);
  }

  const subtractProductQtd = (id, price) => {
    let product = shopCart.findIndex((product) => product.id === id);
    let updateList = [ ...shopCart ];
    if (product > -1) {
      if (updateList[product].qtd > 0) {
        updateList[product].qtd -= 1;
      }
    } else {
      updateList.push({ id, qtd: 0, price });
    }
    setShopCart(updateList);
  }

  const handlePrice = () => {
    let price = 0;
    shopCart.forEach((product) => price += (parseFloat(product.price) * product.qtd));
    // console.log(220 / 100, 'price');
    setTotalProducts(convertPrice(Math.round(price * 100) / 100));
  }

  const convertPrice = price => {
    const priceArray = price.toString().split('.');
    let newPrice = priceArray.join(',');
    if (priceArray.length > 1 && priceArray[1].length === 1) newPrice = newPrice + '0';
    return newPrice === '0' ? `R$ ${newPrice},00` : `R$ ${newPrice}`;
  };

  useEffect(() => {
    setShopCart(getToLocalStorageShopCart());
  }, []);

  useEffect(() => {
    handlePrice();
    setToLocalStorage('shopCart', shopCart);
  }, [shopCart]);

  const globalState = {
    totalProducts,
    setTotalProducts,
    products,
    setProducts,
    shopCart,
    setShopCart,
    addProductQtd,
    subtractProductQtd,
  };

  return (
    <BeerAppContext.Provider value={globalState}>
      {children}
    </BeerAppContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.shape({}),
};

Provider.defaultProps = {
  children: {},
};

export default Provider;
