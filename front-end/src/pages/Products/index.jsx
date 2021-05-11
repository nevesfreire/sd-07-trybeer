import React, { useEffect, useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import ProductCard from '../../components/ProductCard';
import { BeerContext } from '../../context';

export default function Products() {
  const [productsList, setProductsList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState('0,00');

  const { totalCart } = useContext(BeerContext);

  const getTotalCartFromLocalStorage = () => {
    const totalFromLS = localStorage.getItem('totalCart');
    if (!totalFromLS) return '0,00';
    return parseFloat(totalFromLS).toFixed(2);
  };
  const disableCartButton = () => {
    if (getTotalCartFromLocalStorage() === '0,00') return true;
    return false;
  };

  useEffect(() => {
    setTotal(getTotalCartFromLocalStorage());
  }, [totalCart]);

  const history = useHistory();
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser === null) {
      history.push('/login');
    } else {
      setIsLoading(true);
      fetch('http://localhost:3001/products')
        .then((response) => response.json())
        .then((products) => {
          setProductsList(products);
          console.log(products);
          setIsLoading(false);
        });
    }
  }, [setIsLoading]);

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
            disabled={ disableCartButton() }
          >
            Ver Carrinho
            <div data-testid="checkout-bottom-btn-value">
              {`R$ ${total.toString().replace('.', ',')}`}
            </div>
          </Button>
        </main>
      </div>);
}
