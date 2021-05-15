import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/TrybeerContext';

function ProductCard({ product, index }) {
  const [quantity, setQuantity] = useState(0);

  const {
    addInCart,
    removeFromCart,
  } = useContext(MyContext);

  const removeProduct = (name, price) => {
    if (quantity === 0) return alert('Não foi possível remover');
    setQuantity(quantity - 1);
    removeFromCart(name, price);
  };

  const addProduct = (id, name, price) => {
    setQuantity(quantity + 1);
    addInCart(id, name, price);
  };

  useEffect(() => {
    const orderResult = JSON.parse(localStorage.getItem('products'));
    if (orderResult !== null) {
      const quantityById = orderResult.find((object) => object.id === product.id);
      if (!quantityById) return setQuantity(0);
      return setQuantity(quantityById.quantity);
    }
  }, []);

  return (
    <div key={ product.id }>
      <img
        src={ product.url_image.replace(/\s/g, '') }
        alt={ product.name }
        data-testid={ `${index}-product-img` }
      />
      <span data-testid={ `${index}-product-name` }>{ product.name }</span>
      <span data-testid={ `${index}-product-price` }>
        { Number(product.price)
          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
      </span>
      <button
        type="button"
        data-testid={ `${index}-product-minus` }
        onClick={ () => removeProduct(product.id, product.price) }
      >
        -
      </button>
      <span data-testid={ `${index}-product-qtd` }>
        { quantity }
      </span>
      <button
        type="button"
        data-testid={ `${index}-product-plus` }
        onClick={ () => addProduct(product.id, product.price, quantity) }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default ProductCard;
