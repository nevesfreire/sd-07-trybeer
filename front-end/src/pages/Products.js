import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import CustomProductCard from '../components/CustomProductCard';
import CentralContext from '../context/Context';
import CustomHeader from '../components/CustomHeader';
import { Card, Grid, Button, Segment } from 'semantic-ui-react';
import { getProduct } from '../helpers/localStorage';
function Products() {
  const { totalKart, setTotalKart } = useContext(CentralContext);

  useEffect(() => {
    const total = JSON.parse(localStorage.getItem('cart'));
    total &&
      total.map((item) => {
        setTotalKart(item[1] * item[2]);
      });
  }, []);

  useEffect(() => {}, [totalKart]);

  const history = useHistory();

  const renderIngredients = () => {
    const products = getProduct();
    return (
      <Card.Group stackable="true">
        {products &&
          products.map((beer, index) => (
            <CustomProductCard key={beer.id} index={index} beer={beer} />
          ))}
      </Card.Group>
    );
  };
  return (
    <div>
      <Grid>
        <Grid.Column>
          <CustomHeader message="TryBeer" />
        </Grid.Column>
        <Header as="h1" color="orange" textAlign="center"></Header>
      </Grid>
      {renderIngredients()}
      <Segment textAlign="center">
        <Button
          circular="true"
          size="big"
          color="orange"
          data-testid="checkout-bottom-btn"
          disabled={!totalKart}
          onClick={() => history.push('/checkout')}
        >
          Ver Carrinho
          <p data-testid="checkout-bottom-btn-value">{`R$ ${totalKart
            .toFixed(2)
            .replace('.', ',')}`}</p>
        </Button>
      </Segment>
    </div>
  );
}
export default Products;
