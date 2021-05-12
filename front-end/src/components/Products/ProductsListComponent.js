import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Segment, Sidebar, Button } from 'semantic-ui-react';

import CardComponent from './CardComponent';

import * as API from '../../helpers/apiHelper';
import * as STORAGE from '../../helpers/localStorageHelper';

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [getTotal, setTotal] = useState('0.00'.replace('.', ','));

  const sumTotal = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const total = cart.reduce(
      (acc, element) => acc + element.price * element.quantidade,
      0,
    );
    setTotal(total.toFixed(2).replace('.', ','));
    localStorage.setItem('total', total.toFixed(2).replace('.', ','));
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

  const renderButton = () => {
    if (getTotal === '0,00') {
      return (
        <Button data-testid="checkout-bottom-btn" color="blue" disabled>
          Ver Carrinho
          <span data-testid="checkout-bottom-btn-value">{`R$ ${getTotal}`}</span>
        </Button>
      );
    }
    return (
      <Link to="/checkout">
        <Button data-testid="checkout-bottom-btn" color="blue">
          Ver Carrinho
          <span data-testid="checkout-bottom-btn-value">{`R$ ${getTotal}`}</span>
        </Button>
      </Link>
    );
  };

  if (STORAGE.getUser() === null) return <Redirect to="/login" />;

  return (
    <Sidebar.Pusher>
      <Segment basic>
        {isLoading ? renderLoading() : renderProductsList()}

        {renderButton()}
      </Segment>
    </Sidebar.Pusher>
  );
}

export default Products;
