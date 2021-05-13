import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Card from '../Card';
import styles from './styles.module.scss';

function Products({ products }) {
  return (
    <div className={ styles.main }>
      <Header />
      <div className={ styles.cards }>
        { products.map((product) => <Card key={ product.id } product={ product } />) }
      </div>
    </div>
  );
}

export default Products;

Products.propTypes = {
  products: PropTypes.objectOf(PropTypes.string).isRequired,
};
