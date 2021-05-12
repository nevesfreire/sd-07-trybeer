import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import api from '../services/api';
import numbers from '../helpers/Numbers';
import Card from './Card';

const ComponentBeers = () => {
  const history = useHistory();
  const token = localStorage.getItem('token');

  const [isLoading, setIsLoading] = useState(false);
  const [priceTotal, setPriceTotal] = useState(
    JSON.parse(localStorage.getItem('productPriceTotals')) || { value: 0.00 },
  );
  const [Beers, setBeers] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const getBeers = async () => {
      const { data } = await api.get('/products');
      setBeers(data);
      setIsLoading(false);
    };
    getBeers();
  }, [history]);

  const priceTotalReduced = Object.values(priceTotal).reduce(
    (curr, next) => curr + next, numbers.ZERO,
  );

  const redirectToCheckout = () => {
    history.push('/checkout');
  };

  return (
    <div className="product-list-container">
      {!token && <Redirect to="/login" />}
      {/* {console.log(`Render beer: ${Beers}`)} */}
      <button
        data-testid="checkout-bottom-btn"
        type="button"
        disabled={ !priceTotalReduced }
        onClick={ redirectToCheckout }
      >
        Ver Carrinho
      </button>
      <div>
        Valor total do carrinho
        <p data-testid="checkout-bottom-btn-value">
          { `R$ ${priceTotalReduced.toFixed(2).replace('.', ',')}` }
        </p>
      </div>
      {isLoading ? (
        <span>Carregando ...</span>
      ) : (
        Beers.map((beer, index) => (
          <Card
            key={ index }
            beer={ beer }
            index={ index }
            setPriceTotal={ setPriceTotal }
            priceTotal={ priceTotal }
          />
        ))
      )}
    </div>
  );
};

export default ComponentBeers;
