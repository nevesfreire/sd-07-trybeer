import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from './BeerAppContext';
import {
  setToLocalStorage,
  getToLocalStorageShopCart,
} from '../utils/localStorage';

function Provider({ children }) {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [shopCart, setShopCart] = useState([]);

  const convertPrice = (price) => {
    const priceArray = price.toString().split('.');
    let newPrice = priceArray.join(',');
    if (priceArray.length > 1 && priceArray[1].length === 1) newPrice += '0';
    return newPrice === '0' ? `R$ ${newPrice},00` : `R$ ${newPrice}`;
  };

  const addProductQtd = (id, price, name) => {
    const productIndex = shopCart.findIndex((item) => item.id === id);
    const updateList = [...shopCart];
    const NOT_EXIST = -1;
    const ADD_ONE = 1;
    if (productIndex > NOT_EXIST) {
      updateList[productIndex].qtd += ADD_ONE;
      updateList[productIndex].totalPrice = convertPrice(Math.round(price * updateList[productIndex].qtd * 100) / 100);
    } else {
      updateList.push({ id, name, qtd: ADD_ONE, price, totalPrice: convertPrice(price) });
    }
    setShopCart(updateList);
  };

  const subtractProductQtd = (id, price, name) => {
    const productIndex = shopCart.findIndex((item) => item.id === id);
    const updateList = [...shopCart];
    const NOT_EXIST = -1;
    const MIN_QTD = 0;
    const SUBTRACT_ONE = 1;
    if (productIndex > NOT_EXIST) {
      if (updateList[productIndex].qtd > MIN_QTD) {
        updateList[productIndex].qtd -= SUBTRACT_ONE;
        updateList[productIndex].totalPrice = convertPrice(Math.round(price * updateList[productIndex].qtd * 100) / 100);
      }
    } else {
      updateList.push({ id, name, qtd: MIN_QTD, price, totalPrice: convertPrice(price) });
    }
    setShopCart(updateList);
  };

  const deleteProduct = (id) => {
    const products = [ ...shopCart ];
    const filterProducts = products.filter((item) => item.id !== id);
    setShopCart(filterProducts);
  }

  const handlePrice = useCallback(() => {
    let price = 0;
    shopCart.forEach((product) => {
      price += parseFloat(product.price) * product.qtd;
    });
    setTotalProducts(convertPrice(Math.round(price * 100) / 100));
  }, [setTotalProducts, shopCart]);

  useEffect(() => {
    setShopCart(getToLocalStorageShopCart());
  }, []);

  useEffect(() => {
    handlePrice();
    setToLocalStorage('shopCart', shopCart);
  }, [handlePrice, shopCart]);

  const globalState = {
    totalProducts,
    setTotalProducts,
    products,
    setProducts,
    shopCart,
    setShopCart,
    addProductQtd,
    subtractProductQtd,
    deleteProduct,
  };

  return (
    <BeerAppContext.Provider value={ globalState }>
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
