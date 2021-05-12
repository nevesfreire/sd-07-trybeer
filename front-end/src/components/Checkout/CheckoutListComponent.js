import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Sidebar, Segment, Button, Form } from 'semantic-ui-react';

import * as STORAGE from '../../helpers/localStorageHelper';
import * as API from '../../helpers/apiHelper';

function CheckoutListComponent() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState('0.00'.replace('.', ','));
  const [formState, setFormState] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
  });
  const [message, setMessage] = useState('');
  const history = useHistory();

  const sumTotal = () => {
    const storageCart = JSON.parse(localStorage.getItem('cart')) || [];

    const totalValue = storageCart.reduce(
      (acc, element) => acc + element.price * element.quantidade,
      0,
    );
    setTotal(totalValue.toFixed(2).replace('.', ','));
    localStorage.setItem('total', totalValue.toFixed(2).replace('.', ','));
  };

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('cart'));
    const storageTotal = localStorage.getItem('total');
    setCart(products);
    setTotal(storageTotal);
    sumTotal();
  }, []);

  const handleClickExclude = (id) => {
    const products = STORAGE.excludeProductFromCheckout(id);
    setCart(products);
    sumTotal();
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { deliveryAddress, deliveryNumber } = formState;
    const { id } = STORAGE.getUser();

    const response = await API.fetchCreateSale(
      id,
      Number(total.replace(',', '.')),
      { deliveryAddress, deliveryNumber: Number(deliveryNumber) },
      cart,
    );
    setMessage(response.message);
    // console.log(id, total, deliveryAddress, deliveryNumber);
    // console.log(response);

    const twoSeconds = 2000;
    setTimeout(() => {
      history.push('/products');
    }, twoSeconds);

    localStorage.removeItem('cart');
  };

  const renderCartProducts = () => cart.map((product, index) => (
    <div key={ product.id } className="cart-products">
      <span data-testid={ `${index}-product-qtd-input` }>
        {product.quantidade}
      </span>
      <span data-testid={ `${index}-product-name` }>{product.name}</span>
      <span data-testid={ `${index}-product-total-value` }>
        {`R$ ${(product.quantidade * product.price)
          .toFixed(2)
          .replace('.', ',')}`}
      </span>
      <span data-testid={ `${index}-product-unit-price` }>
        {`(R$ ${product.price.replace('.', ',')} un)`}
      </span>
      <Button
        color="red"
        onClick={ () => handleClickExclude(product.id) }
        data-testid={ `${index}-removal-button` }
      >
        X
      </Button>
    </div>
  ));

  const renderTotal = () => (
    <div>
      Total:
      <span data-testid="order-total-value">{`R$ ${total}`}</span>
    </div>
  );

  const renderForm = () => {
    const { deliveryAddress, deliveryNumber } = formState;

    return (
      <Form onSubmit={ handleSubmit }>
        <label htmlFor="deliveryAddress">
          Rua:
          <input
            name="deliveryAddress"
            type="text"
            onChange={ handleChange }
            value={ deliveryAddress }
            data-testid="checkout-street-input"
          />
        </label>
        <label htmlFor="deliveryNumber">
          Número da casa:
          <input
            name="deliveryNumber"
            type="text"
            onChange={ handleChange }
            value={ deliveryNumber }
            data-testid="checkout-house-number-input"
          />
        </label>
        {total !== '0,00' && deliveryAddress !== '' && deliveryNumber !== '' ? (
          <Button color="green" data-testid="checkout-finish-btn">
            Finalizar Pedido
          </Button>
        ) : (
          <Button color="green" disabled data-testid="checkout-finish-btn">
            Finalizar Pedido
          </Button>
        )}
      </Form>
    );
  };

  if (STORAGE.getUser() === null) return <Redirect to="/login" />;

  return (
    <Sidebar.Pusher>
      <Segment basic>
        {renderCartProducts()}
        {total === '0,00' && <span>Não há produtos no carrinho</span>}
        {renderTotal()}
        {renderForm()}
        {message.length !== 0 && <span>{message}</span>}
      </Segment>
    </Sidebar.Pusher>
  );
}

export default CheckoutListComponent;
