import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from '../../context/BeerAppContext';
import './style.css';

function CheckoutCard({ product }) {
  const { id, name, qtd, price, totalPrice } = product;
  const { deleteProduct } = useContext(BeerAppContext);

  const convertPrice = (value) => {
    const priceArray = value.toString().split('.');
    let newPrice = priceArray.join(',');
    if (priceArray.length > 1 && priceArray[1].length === 1) newPrice += '0';
    return newPrice === '0' ? `R$ ${newPrice},00` : `R$ ${newPrice}`;
  };

  return (
    qtd > 0 && (
      <div className='checkout-card-und-container'>
        <h2 data-testid={ `${id - 1}-product-name` }>{name}</h2>
        <p data-testid={ `${id - 1}-product-qtd-input` }>Quantidade: {qtd}</p>
        <p data-testid={ `${id - 1}-product-unit-price` }>
          {`Preço: (${convertPrice(price)} un)`}
        </p>
        <p data-testid={ `${id - 1}-product-total-value` }>Total {totalPrice}</p>
        <button
          type="button"
          onClick={ () => deleteProduct(id) }
          data-testid={ `${id - 1}-removal-button` }
        >
          X
        </button>
      </div>
    )
  );
}

CheckoutCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    qtd: PropTypes.number,
    price: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};

export default CheckoutCard;
