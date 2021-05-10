import React, { useEffect, useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';

import 'semantic-ui-css/semantic.min.css';
import { Sidebar, Segment, Button, Form } from 'semantic-ui-react';

import * as STORAGE from '../helpers/localStorageHelper';
import * as API from '../helpers/apiHelper';

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
      deliveryAddress,
      Number(deliveryNumber),
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

  const renderCartProducts = () => cart.map((product) => (
    <div key={ product.id }>
      <span>{product.quantidade}</span>
      <span>{product.name}</span>
      <span>{(product.quantidade * product.price).toFixed(2)}</span>
      <Button color="red" onClick={ () => handleClickExclude(product.id) }>
        X
      </Button>
    </div>
  ));

  const renderTotal = () => (
    <div>
      Total: R$
      <span>{total}</span>
    </div>
  );

  const renderForm = () => (
    <Form onSubmit={ handleSubmit }>
      <label htmlFor="deliveryAddress">
        Rua:
        <input
          name="deliveryAddress"
          type="text"
          onChange={ handleChange }
          value={ formState.deliveryAddress }
        />
      </label>
      <label htmlFor="deliveryNumber">
        Número da casa:
        <input
          name="deliveryNumber"
          type="text"
          onChange={ handleChange }
          value={ formState.deliveryNumber }
        />
      </label>
      {total !== '0,00' ? (
        <Button color="green">Finalizar Pedido</Button>
      ) : (
        <Button color="green" disabled>
          Finalizar Pedido
        </Button>
      )}
    </Form>
  );

  if (STORAGE.getUser() === null) return <Redirect to="/login" />;

  return (
    <Sidebar.Pusher>
      <Segment basic>
        {renderCartProducts()}
        {renderTotal()}
        {renderForm()}
        {message.length !== 0 && <span>{message}</span>}
      </Segment>
    </Sidebar.Pusher>
  );
}

export default CheckoutListComponent;
