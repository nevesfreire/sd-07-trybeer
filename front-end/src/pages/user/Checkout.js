import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Checkout() {
  const { sideIsActive, setPageTitle, totalChart, productsChart } = useContext(MyContext);
  const [user, setUser] = useState({});

  const history = useHistory();

  useEffect(() => {
    setPageTitle('Finalizar Pedido');
  }, [setPageTitle]);

  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
      return setUser(userStorage);
    };
    getUser();
  }, [history]);

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      <h2>Produtos</h2>
      <ul>
        { productsChart.map((product, index) => (
          <li key={ index }>
            <span data-testid={ `${index}-product-qtd-input` }>{product.quantity}</span>
            <span data-testid={ `${index}-product-name` }>{product.name}</span>
            <span data-testid={ `${index}-product-total-value` }>{product.total}</span>
            <span data-testid={ `${index}-product-unit-price` }>{product.price}</span>
            <button
              type="button"
              data-testid="0-removal-button"
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
          // onChange={ (e) => setEmail(e.target.value) }
          />
        </label>
        <label htmlFor="checkout-house-number-input">
          Número da casa:
          <input
            id="checkout-house-number-input"
            data-testid="checkout-house-number-input"
            type="text"
          // onChange={ (e) => setPassword(e.target.value) }
          />
        </label>
      </form>
      <button type="button" data-testid="checkout-finish-btn">Finalizar Pedido</button>
    </div>
  );
}

export default Checkout;
