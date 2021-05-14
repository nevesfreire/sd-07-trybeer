import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import BeerAppContext from '../../context/BeerAppContext';
import Container from './style';

function ProductCard({ product }) {
  const { addProductQtd, subtractProductQtd, shopCart } = useContext(BeerAppContext);

  const convertPrice = (price) => {
    const priceArray = price.split('.');
    const newPrice = priceArray.join(',');
    return `R$ ${newPrice}`;
  };

  const getQtd = () => {
    const item = shopCart.find((cart) => cart.id === product.id);
    if (item) {
      return item.qtd;
    }
    return 0;
  };

  return (
    <Container key={ product.id }>
      <img
        className="image"
        src={ product.url_image }
        alt={ product.name }
        width="100"
        data-testid={ `${product.id - 1}-product-img` }
      />
      <h2 data-testid={ `${product.id - 1}-product-name` }>{product.name}</h2>
      <p data-testid={ `${product.id - 1}-product-price` }>
        {convertPrice(product.price)}
      </p>
      <div className="quantity-box">
        <button
          type="button"
          onClick={ () => addProductQtd(product.id, product.price, product.name) }
          data-testid={ `${product.id - 1}-product-plus` }
        >
          <h3>+</h3>
        </button>
        <p data-testid={ `${product.id - 1}-product-qtd` }>{getQtd()}</p>
        <button
          type="button"
          onClick={ () => subtractProductQtd(product.id, product.price, product.name) }
          data-testid={ `${product.id - 1}-product-minus` }
        >
          <h3>-</h3>
        </button>
      </div>
    </Container>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    price: PropTypes.string,
    name: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
