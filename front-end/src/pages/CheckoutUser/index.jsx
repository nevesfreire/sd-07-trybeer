import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { fetchFinishSale } from '../../services';

export default function CheckoutUser() {
  const [cartItems, setCartItems] = useState([]);
  const [emptyCart, setEmptyCart] = useState(true);
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [totalCart, setTotalCart] = useState('');
  const [alertController, setAlertController] = useState(false);

  useEffect(() => {
    const localStorageCart = JSON.parse(localStorage.getItem('cart'));
    const localStorageTotalCart = JSON.parse(localStorage.getItem('totalCart'));
    setCartItems(localStorageCart);
    setTotalCart(localStorageTotalCart);
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setEmptyCart(true);
    } else {
      setEmptyCart(false);
    }
  }, [cartItems]);

  const timeoutMessage = 5000;

  // const handleUpdateMessage = async () => {
  //   setAlertController(true);
  //   setTimeout(() => {
  //     setAlertController(false);
  //   }, timeoutMessage);
  // };

  const removeItemFromCart = (id) => {
    const atualItem = cartItems.find((product) => product.id === id);
    const newCart = cartItems.filter((product) => product.id !== id);
    localStorage.setItem('totalCart', JSON.stringify(totalCart - atualItem.totalPrice));
    localStorage.setItem('cart', JSON.stringify(newCart));
    setCartItems(newCart);
    setTotalCart(totalCart - atualItem.totalPrice);
  };

  const history = useHistory();

  const finishButton = async (event) => {
    event.preventDefault();
    const { id } = JSON.parse(localStorage.getItem('user'));
    const addressObject = {
      address,
      houseNumber,
    };
    await fetchFinishSale(id, totalCart, addressObject, cartItems);
    setAlertController(true);
    setTimeout(() => {
      localStorage.setItem('totalCart', '0,00');
      localStorage.setItem('cart', JSON.stringify([]));
      setAlertController(false);
      history.push('/products');
    }, timeoutMessage);
  };
  return (
    <div>
      <ul>
        Produtos
        {emptyCart ? <h2>Não há produtos no carrinho</h2>
          : cartItems.map((product, index) => (
            <li key={ index }>
              <div data-testid={ `${index}-product-qtd-input` }>{product.quantity}</div>
              <div data-testid={ `${index}-product-name` }>{product.name}</div>
              <div data-testid={ `${index}-product-total-value` }>
                {product.totalPrice}
              </div>
              <div data-testid={ `${index}-product-unit-price` }>{product.price}</div>
              <button
                type="button"
                data-testid={ `${index}-product-removal-button` }
                onClick={ () => removeItemFromCart(product.id) }
              >
                X
              </button>
            </li>
          ))}
      </ul>
      <div data-testid="order-total-value">{ totalCart }</div>
      <Form className="form__login">
        <h2>Endereço: </h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Rua: </Form.Label>
          <Form.Control
            data-testid="checkout-street-input"
            type="text"
            onChange={ ({ target: { value } }) => setAddress(value) }
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Número da casa: </Form.Label>
          <Form.Control
            data-testid="checkout-house-number-input"
            type="text"
            onChange={ ({ target: { value } }) => setHouseNumber(value) }
          />
        </Form.Group>
        <Button
          data-testid="checkout-finish-btn"
          variant="primary"
          type="button"
          className="form__login__btn"
          onClick={ (event) => finishButton(event) }
          // disabled={ !inputValidation() }
        >
          Finalizar Pedido
        </Button>
        { alertController && <p>Compra realizada com sucesso</p> }
      </Form>
    </div>
  );
}
