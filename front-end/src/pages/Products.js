import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Button,
  Segment,
  Header,
  Container,
  Icon,
} from 'semantic-ui-react';
import CustomRenderProducts from '../components/CustomRenderProducts';
import CentralContext from '../context/Context';
import CustomHeader from '../components/CustomHeader';
import CustomTopMenu from '../components/CustomTopMenu';

import './pagesStyles.css';

function Products() {
  const { totalKart, setTotalKart } = useContext(CentralContext);

  useEffect(() => {
    const total = JSON.parse(localStorage.getItem('cart'));
    let memo = 0;
    if (total) {
      total.map((item) => {
        memo = item[1] * item[2];
        return memo;
      });
    }
    setTotalKart(memo);
  }, [setTotalKart]);

  useEffect(() => {}, [totalKart]);

  const history = useHistory();

  return (
    <div style={ { width: '100%', backgroundColor: 'rgb(33, 33, 33)' } }>
      <Container>
        <Header style={ { display: 'flex', alignItems: 'center' } }>
          <CustomTopMenu />
          <CustomHeader message="Produtos" />
        </Header>
      </Container>
      <Container style={ { margin: 'auto', padding: '20' } }>
        <CustomRenderProducts />
      </Container>
      <Segment
        textAlign="center"
        style={ { width: '100%', backgroundColor: 'rgb(33, 33, 33)' } }
      >
        <Button
          raised
          size="big"
          color="orange"
          data-testid="checkout-bottom-btn"
          disabled={ !totalKart }
          onClick={ () => history.push('/checkout') }
        >
          <Icon name="shop" />
          Ver Carrinho
          <p data-testid="checkout-bottom-btn-value">
            {`R$ ${totalKart.toFixed(2).replace('.', ',')}`}
          </p>
        </Button>
      </Segment>
    </div>
  );
}
export default Products;
