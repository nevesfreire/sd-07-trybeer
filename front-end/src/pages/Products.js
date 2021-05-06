import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Grid, Button } from 'semantic-ui-react';

import CardComponent from '../components/CardComponent';
import HeaderComponent from '../components/HeaderComponent';
import * as API from '../helpers/apiHelper';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getTotal, setTotal] = useState(0);

  const sumTotal = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const total = cart.reduce(
      (acc, element) => acc + element.price * element.quantidade,
      0,
    );
    setTotal(total.toFixed(2).replace('.', ','));
  };

  useEffect(() => {
    API.fetchProducts().then((data) => {
      setProducts(data.products);
      setIsLoading(false);
    });
    sumTotal();
  }, []);

  const renderProductsList = () => products.map((product) => (
    <CardComponent key={ product.id } product={ product } sumTotal={ sumTotal } />
  ));

  const renderLoading = () => <h1>LOADING...</h1>;

  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <HeaderComponent message="Trybeer" />

        {isLoading ? renderLoading() : renderProductsList()}

        <Link to="/checkout">
          <Button data-testid="checkout-bottom-btn" color="blue">
            Ver carrinho R$
            {getTotal}
          </Button>
        </Link>
      </Grid.Column>
    </Grid>
  );
}

export default Products;
