import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { ProductCard, ClientMenu } from '../../components';

import api from '../../services/api';
import { Context } from '../../context';

import './style.css';

function Products({ history }) {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const { cart, totalPrice } = useContext(Context);

  const priceFormat = `R$ ${totalPrice.replace(/\./g, ',')}`;

  useEffect(() => {
    (async () => {
      const response = await api.getProducts();
      setProducts(response);
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? <h1 className="loading">Carregando</h1> : (
    <>
      <ClientMenu><p data-testid="top-title">TryBeer</p></ClientMenu>
      <section className="products-container">
        {products.map((product) => <ProductCard key={ product.id } data={ product } />)}
      </section>
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        className="checkout-button"
        disabled={ cart.length === 0 }
        onClick={ () => history.push('/checkout') }
      >
        <p>Ver Carrinho</p>
        <p data-testid="checkout-bottom-btn-value">{ priceFormat }</p>
      </button>
    </>
  );
}

Products.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Products;
