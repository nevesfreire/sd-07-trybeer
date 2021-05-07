import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Checkout() {
  const {
    sideIsActive,
    setPageTitle,
  } = useContext(MyContext);

  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');

  const history = useHistory();

  useEffect(() => {
    setPageTitle('Finalizar Pedido');
  }, [setPageTitle]);

  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
      return setEmail(userStorage.email);
    };
    getUser();
  }, [history]);

  const handleDelete = ({ target }) => {
    const products = productsChart.filter((product) => product !== target.value);
    setProductsChart(products);
  };

  const isDisabled = () => totalChart === 0 || address === '' || addressNumber === '';

  const CREATED = 201;
  const TWOSECONDS = 2000;

  const finished = () => history.push('/products');

  const handleFinish = () => {
    fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        email,
        totalChart,
        address,
        addressNumber,
        saleDate: new Date(),
        status: 'Pendente',
      }),
    }).then((response) => response.status)
      .then((data) => {
        if (data !== CREATED) return <span>Ocorreu um erro</span>;
        return <span>Compra realizada com sucesso!</span>;
      })
      .then(setTimeout(finished, TWOSECONDS));
  };

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }

      <h2>Produtos</h2>

      {totalChart === 0 && <h2>Não há produtos no carrinho</h2> }

      <ul>
        { cart.map((product, index) => (
          <li key={ index }>
            <span data-testid={ `${index}-product-qtd-input` }>{product.quantity}</span>
            <span data-testid={ `${index}-product-name` }>{product.name}</span>
            <span data-testid={ Number(product.totalItem)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }</span>
            <span data-testid={ `${index}-product-unit-price` }>{`${product.price} (un)`}</span>
            <button
              type="button"
              data-testid={ `${index}-removal-button` }
              value={ product }
              onClick={ (e) => handleDelete(e) }
            >
              X
            </button>
          </li>
        ))}
      </ul>
      <h3 data-testid="order-total-value">{`Total: ${totalChart}`}</h3>
      <h2>Endereço</h2>
      <form>
        <label htmlFor="checkout-street-input">
          Rua:
          <input
            id="checkout-street-input"
            data-testid="checkout-street-input"
            type="text"
            onChange={ (e) => setAddress(e.target.value) }
          />
        </label>
        <label htmlFor="checkout-house-number-input">
          Número da casa:
          <input
            id="checkout-house-number-input"
            data-testid="checkout-house-number-input"
            type="text"
            onChange={ (e) => setAddressNumber(e.target.value) }
          />
        </label>
      </form>
      <button
        type="button"
        data-testid="checkout-finish-btn"
        disabled={ isDisabled }
        onClick={ handleFinish }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}

export default Checkout;
