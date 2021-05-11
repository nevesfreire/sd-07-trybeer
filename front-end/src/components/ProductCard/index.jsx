import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import './ProductCard.css';
import { BeerContext } from '../../context';

export default function ProductCard(props) {
  const { product, index } = props;
  const { name, price } = product;
  const imageSrc = product.url_image;

  const [quantity, setQuantity] = useState(0);
  const [buttonClicked, setButtonClicked] = useState('');

  const {
    totalCart,
    setTotalCart,
    productsCart,
    setProductsCart,
  } = useContext(BeerContext);

  const productIsInTheCart = () => {
    if (productsCart.length === 0) {
      return false;
    }
    return productsCart.some((p) => p.name === name);
  };
  const changeProductQuantity = () => {
    const updatedCart = productsCart.map((p) => {
      if (p.name === name) {
        return { name, quantity, totalPrice: (parseFloat(price) * quantity).toFixed(2) };
      } return p;
    });
    setProductsCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateProductAtCart = () => {
    if (buttonClicked === 'plus') {
      if (!productIsInTheCart()) {
        setProductsCart(
          [...productsCart, { name, quantity, totalPrice: parseFloat(price) }],
        );
        localStorage.setItem('cart',
          JSON.stringify([...productsCart,
            { name, quantity, totalPrice: parseFloat(price) }]));
      } else {
        changeProductQuantity();
      }
    }
    if (buttonClicked === 'minus') {
      if (quantity === 0) {
        setProductsCart(productsCart.filter((p) => p.name !== name));
        localStorage.setItem('cart',
          JSON.stringify(productsCart.filter((p) => p.name !== name)));
      } else {
        changeProductQuantity();
      }
    }
  };

  const sumTotalValue = (() => {
    if (buttonClicked === 'plus') {
      setTotalCart(totalCart + parseFloat(price));
      localStorage.setItem('totalCart', JSON.stringify(totalCart + parseFloat(price)));
    }
    if (buttonClicked === 'minus') {
      setTotalCart(totalCart - parseFloat(price));
      localStorage.setItem('totalCart', JSON.stringify(totalCart - parseFloat(price)));
    }
  });

  useEffect(() => {
    updateProductAtCart();
    console.log(quantity);
    sumTotalValue();
  }, [quantity, buttonClicked]);

  const minus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setButtonClicked('minus');
    }
  };

  const plus = () => {
    setQuantity(quantity + 1);
    setButtonClicked('plus');
  };

  const getQuantityFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) return '0';
    const productFromLocalStorage = cart.find((p) => p.name === name);
    if (productFromLocalStorage === undefined) return '0';
    const productQuantity = productFromLocalStorage.quantity.toString();
    console.log(productQuantity);
    return productQuantity;
  };

  return (
    <Card style={ { width: '18rem' } }>
      <Card.Img
        variant="top"
        src={ imageSrc }
        data-testid={ `${index}-product-img` }
      />
      <Card.Body>
        <Card.Title
          data-testid={ `${index}-product-name` }
        >
          { name }
        </Card.Title>
        <Card.Text data-testid={ `${index}-product-price` }>
          {`R$ ${price.toString().replace('.', ',')}`}
        </Card.Text>
        <Button
          variant="primary"
          data-testid={ `${index}-product-minus` }
          onClick={ minus }
          id="num"
        >
          -
        </Button>
        <div
          data-testid={ `${index}-product-qtd` }
        >
          { getQuantityFromLocalStorage() }
        </div>
        <Button
          variant="primary"
          data-testid={ `${index}-product-plus` }
          onClick={ plus }
          id="num"
        >
          +
        </Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    url_image: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
