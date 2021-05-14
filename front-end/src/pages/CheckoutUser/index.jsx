import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Header from '../../components/Header';
import { fetchFinishSale } from '../../services';
import { BeerContext } from '../../context';

export default function CheckoutUser() {
  const [cartItems, setCartItems] = useState([]);
  const [emptyCart, setEmptyCart] = useState(true);
  const [address, setAddress] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [total, setTotal] = useState('');
  const [alertController, setAlertController] = useState(false);

  const { totalCart, setTotalCart } = useContext(BeerContext);

  const history = useHistory();
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser === null) {
      history.push('/login');
    } else {
      const localStorageCart = JSON.parse(localStorage.getItem('cart'));
      const localStorageTotalCart = JSON.parse(localStorage.getItem('totalCart'));
      setCartItems(localStorageCart);
      setTotalCart(localStorageTotalCart.toFixed(2));
    }
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      setEmptyCart(true);
    } else {
      setEmptyCart(false);
    }
  }, [cartItems]);

  const getTotalCartFromLocalStorage = () => {
    const totalFromLS = localStorage.getItem('totalCart');
    if (!totalFromLS) return '0,00';
    return parseFloat(totalFromLS).toFixed(2);
  };

  useEffect(() => {
    setTotal(getTotalCartFromLocalStorage());
  }, [totalCart]);

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
      localStorage.setItem('totalCart', 0);
      localStorage.setItem('cart', JSON.stringify([]));
      setAlertController(false);
      history.push('/products');
    }, timeoutMessage);
  };
  const disableFinishButton = () => {
    if (emptyCart || address === '' || houseNumber === '') return true;
    return false;
  };

  return (
    <div>
      <Header namePage="Finalizar Pedido" />
      <ul>
        Produtos
        {emptyCart ? <h2>Não há produtos no carrinho</h2>
          : cartItems.map((product, index) => (
            <li key={ index }>
              <div data-testid={ `${index}-product-qtd-input` }>{product.quantity}</div>
              <div data-testid={ `${index}-product-name` }>{product.name}</div>
              <div data-testid={ `${index}-product-total-value` }>
                {`R$ ${product.totalPrice.toString().replace('.', ',')}`}
              </div>
              <div data-testid={ `${index}-product-unit-price` }>
                {`(R$ ${product.price.toString().replace('.', ',')} un)`}
              </div>
              <button
                type="button"
                data-testid={ `${index}-removal-button` }
                onClick={ () => removeItemFromCart(product.id) }
              >
                X
              </button>
            </li>
          ))}
      </ul>
      <div data-testid="order-total-value">
        {`R$ ${total.toString().replace('.', ',')}`}
      </div>
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
          disabled={ disableFinishButton() }
        >
          Finalizar Pedido
        </Button>
        { alertController && <p>Compra realizada com sucesso!</p> }
      </Form>
    </div>
  );
}
