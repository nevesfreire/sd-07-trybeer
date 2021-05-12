import React, { useContext } from 'react'
import BeerAppContext from '../../context/BeerAppContext';

function CheckoutCard({ product }) {
  const { id, name, qtd, price, totalPrice } =  product;
  const { deleteProduct } = useContext(BeerAppContext);
  
  const convertPrice = (price) => {
    const priceArray = price.toString().split('.');
    let newPrice = priceArray.join(',');
    if (priceArray.length > 1 && priceArray[1].length === 1) newPrice += '0';
    return newPrice === '0' ? `R$ ${newPrice},00` : `R$ ${newPrice}`;
  };

  return (
    qtd > 0 &&
      <div>
        <p data-testid={`${id -1}-product-name`} >{name}</p>
        <p data-testid={`${id -1}-product-qtd-input`} >{qtd}</p>
        <p data-testid={`${id -1}-product-unit-price`} >{convertPrice(price)} un</p>
        <p data-testid={`${id -1}-product-total-value`} >{totalPrice}</p>
      <button
        type="button"
        data-testid={`${id -1}-product-removal-button`}
        onClick={() => deleteProduct(id)}
      >
        X
      </button>
    </div>
  )
}

export default CheckoutCard;
