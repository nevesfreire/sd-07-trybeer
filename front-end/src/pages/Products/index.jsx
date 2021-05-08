import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';

export default function Products() {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((products) => {
        setProductsList(products);
        console.log(products);
        setIsLoading(false);
      });
  }, [setIsLoading]);

  const history = useHistory();

  const handleCartButton = (event) => {
    event.preventDefault();

    history.push('/checkout');
  };
  return isLoading ? (
    <div>Loading...</div>
  )
    : (
      <div>
        <Header namePage="TryBeer" />
        <main>
          { productsList
            .map((product, index) => (<ProductCard
              key={ product.id }
              product={ product }
              index={ index }
            />)) }
          <Button
            data-testid="checkout-bottom-btn"
            variant="primary"
            type="button"
            className="form__login__btn"
            onClick={ (event) => handleCartButton(event) }
            // disabled={ !inputValidation() }
          >
            <div data-testid="checkout-bottom-btn">Ver carrinho</div>
            <div data-testid="checkout-bottom-btn-value">R$ 0,00</div>
          </Button>
        </main>
      </div>);
}
