import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../Header';
import Card from '../Card';
import format from '../../util/format';

function Products({ products }) {
  const totalPrice = useSelector((state) => state.client.totalPrice);
  const history = useHistory();

  return (
    <div>
      <Header>TryBeer</Header>
      { products.map((product) => <Card key={ product.id } product={ product } />) }
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        disabled={ totalPrice === 0 }
        onClick={ () => history.push('/checkout') }
      >
        Ver Carrinho
        <span data-testid="checkout-bottom-btn-value">
          { format(totalPrice) }
        </span>
      </button>
    </div>
  );
}

export default Products;

Products.propTypes = {
  products: PropTypes.objectOf(PropTypes.string).isRequired,
};
