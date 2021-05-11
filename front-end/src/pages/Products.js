import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import CustomProductCard from '../components/CustomProductCard';
import CentralContext from '../context/Context';
import CustomHeader from '../components/CustomHeader';
import { Card, Grid } from 'semantic-ui-react';


function Products() {
  const { totalKart, setTotalKart} = useContext(CentralContext);

  useEffect(() => {
    let localtotal = 0 
    const total = JSON.parse(localStorage.getItem('cart'));
    total && total.map(item => {
      localtotal = localtotal + item[1] * item[2] 
    })
    setTotalKart(localtotal)
  }, []);

  useEffect(() => {}, [totalKart]);

  const history = useHistory();

  const renderIngredients = () => {
    const products = JSON.parse(localStorage.getItem('product'));
    // fiz com a função do helper antes mas deu erro
    return (
      <div>
        <Card.Group stackable="true">
          {products &&
            products.map((beer, index) => (
              <CustomProductCard key={beer.id} index={index} beer={beer} />
            ))}
        </Card.Group>
      </div>
    );
  };
  return (
    <div>
      <Grid container >
      <Grid.Column>
      <CustomHeader message='TryBeer'/>
      </Grid.Column>
      <Header  as="h1" color="orange" textAlign="center">
      </Header>
      </Grid>
      <Grid>
      {renderIngredients()}
        <button
          data-testid="checkout-bottom-btn"
          disabled={!totalKart}
          onClick={() => history.push('/checkout')}
        >
          Ver Carrinho
          <p data-testid="checkout-bottom-btn-value">{`R$ ${totalKart
            .toFixed(2)
            .replace('.', ',')}`}</p>
        </button>
        </Grid>
    </div>
  );
}
export default Products;