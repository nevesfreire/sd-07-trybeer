import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TrybeerContext from './TrybeerContext';

const updateTotalValue = () => {
  const cartResult = localStorage.getItem('TotalValue');
  if (cartResult === null) return 0;
  return Number(cartResult);
};

const updatedOrderValue = () => {
  const orderResult = JSON.parse(localStorage.getItem('products'));
  if (orderResult === null) return [];
  return orderResult;
};

function TrybeerProvider({ children }) {
  const [order, setOrder] = useState(updatedOrderValue());
  const [totalValue, setTotalValue] = useState(updateTotalValue());

  const addInCart = (id, price, quantity) => {
    const orderResult = JSON.parse(localStorage.getItem('products'));

    if (orderResult === null) {
      return setOrder([{ id, price: Number(price), quantity: quantity + 1 }]);
    }

    const updatedOrder = orderResult.filter((object) => object.id !== id);
    setOrder([...updatedOrder, { id, price: Number(price), quantity: quantity + 1 }]);
    // setTotalValue(totalValue + Number(price));
  };

  const removeFromCart = (id, price) => {
    // setTotalValue(totalValue - Number(price));
    const orderResult = JSON.parse(localStorage.getItem('products'));

    const findById = orderResult.find((product) => id === product.id);

    if (findById.quantity <= 1) {
      const updatedOrder = order.filter((product) => product.id !== id);

      return setOrder(updatedOrder);
    }

    const updatedOrder = order.map((product) => {
      if (product.id === id) {
        return { id, price: Number(price), quantity: product.quantity - 1 };
      }
      return product;
    });
    return setOrder(updatedOrder);
  };

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(order));

    const totalValueOfProducts = order.reduce((acc, product) => {
      const totalPricePerProduct = Number(product.quantity) * Number(product.price);
      return acc + totalPricePerProduct;
    }, 0);

    setTotalValue(totalValueOfProducts);
    localStorage.setItem('TotalValue', totalValueOfProducts);
  }, [order]);

  useEffect(() => {
    const orderResult = JSON.parse(localStorage.getItem('products'));

    if (orderResult === null) setOrder([]);
    const totalValueOfProducts = orderResult.reduce((acc, product) => {
      const totalPricePerProduct = Number(product.quantity) * Number(product.price);
      return acc + totalPricePerProduct;
    }, 0);

    setTotalValue(totalValueOfProducts);
    localStorage.setItem('TotalValue', totalValueOfProducts);
  }, []);

  const context = {
    addInCart,
    removeFromCart,
    totalValue,
    setTotalValue,
  };

  return (
    <main>
      <TrybeerContext.Provider value={ context }>
        {children}
      </TrybeerContext.Provider>
    </main>
  );
}

TrybeerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TrybeerProvider;
