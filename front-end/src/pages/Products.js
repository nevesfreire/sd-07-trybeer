import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import CustomTopMenu from '../components/CustomTopMenu';
import CustomProductCard from '../components/CustomProductCard';
import CentralContext from '../context/Context';

// import fetchProducts from '../service/products';

function Products() {
  const { totalKart } = useContext(CentralContext);

  useEffect(() => {}, [totalKart]);// recarregar valor do carrinho

  const history = useHistory();

  const renderIngredients = () => {
    const products = JSON.parse(localStorage.getItem('product'));
    // fiz com a função do helper antes mas deu erro
    return (
      <div>
        {products && products.map((beer, index) => (
          <CustomProductCard
            key={ beer.id }
            index={ index }
            beer={ beer }
          />
        ))}
      </div>
    );
  };
  return (
    <div>
      <Header as="h1" color="orange" textAlign="center">
        <CustomTopMenu />
        <div data-testid="top-title">
          TryBeer
        </div>
      </Header>
      {renderIngredients()}
      <div>
        <button
          data-testid="checkout-bottom-btn"
          disabled={ !totalKart }
          onClick={ () => history.push('/checkout') }
        >
          Ver Carrinho
          <p data-testid="checkout-bottom-btn-value">{`R$ ${totalKart.toFixed(2).replace('.', ',')}`}</p>
        </button>
      </div>
    </div>
  );
}

export default Products;
