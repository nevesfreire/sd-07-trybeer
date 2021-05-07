import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BeerContext } from '../context/BeerContext';
import { Redirect } from 'react-router';

const ProductCard = (props) => {
  const { data } = props;
  const { key, product } = data;
  const { name, price, urlImage, id } = product;
  const [quantity, setQuantity] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem('cart'))
    if(localValue && localValue[id] && localValue[id].quantity){
      return localValue[id].quantity
    }
    return 0;
  });
  const { cart, setCart } = useContext(BeerContext);
  const accPrice = price.replace('.', ',');

  useEffect(() => {
    const pushCart = { ...cart, [id]: { product, quantity } };
    localStorage.setItem('cart', JSON.stringify(pushCart))
    setCart(pushCart);
  }, [quantity]);

  if(!localStorage.getItem('token')){
    return(<Redirect to="/login"/>)
  }

  return (
    <div>
      <h5 data-testid={ `${key}-product-name` }>{name}</h5>
      <p data-testid={ `${key}-product-price` }>{`R$ ${accPrice}`}</p>
      <img
        src={ urlImage }
        alt={ `${key}-product-img` }
        width="50"
        data-testid={ `${key}-product-img` }
      />
      <button
        type="button"
        data-testid={ `${key}-product-minus` }
        onClick={ () => { if (quantity > 0)setQuantity(quantity - 1); } }
      >
        -
      </button>
      <p data-testid={ `${key}-product-qtd` }>{quantity}</p>
      <button
        type="button"
        data-testid={ `${key}-product-plus` }
        onClick={ () => setQuantity(quantity + 1) }
      >
        +
      </button>
    </div>);
};

ProductCard.propTypes = {
  data: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default ProductCard;
