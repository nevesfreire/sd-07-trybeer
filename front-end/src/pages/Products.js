import React, { useState, useEffect } from 'react';

import 'semantic-ui-css/semantic.min.css';
import { Grid, Button } from 'semantic-ui-react';

import CardComponent from '../components/CardComponent';
import HeaderComponent from '../components/HeaderComponent';
import * as API from '../helpers/apiHelper';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.fetchProducts().then((data) => {
      setProducts(data.products);
      setIsLoading(false);
    });
  }, []);

  const renderProductsList = () => products.map((product) => (
    <CardComponent key={ product.id } product={ product } />
  ));

  const renderLoading = () => <h1>LOADING...</h1>;

  return (
    <Grid textAlign="center" style={ { height: '100vh' } } verticalAlign="middle">
      <Grid.Column style={ { maxWidth: 500 } }>
        <HeaderComponent message="Trybeer" />
        {isLoading ? renderLoading() : renderProductsList()}
      </Grid.Column>

      <Button>Ver carrinho</Button>
    </Grid>
  );
}

export default Products;
