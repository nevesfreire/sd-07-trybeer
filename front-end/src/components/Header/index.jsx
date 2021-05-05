import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles.css';

const Header = ({ headerTitle = 'TryBeer' }) => {
  const history = useHistory();
  const [sideMenu, setSideMenu] = useState(true);

  function handleClick({ target }) {
    switch (target.name) {
      case 'products':
        return history.push('/products');
      case 'orders':
        return history.push('/orders');
      case 'profile':
        return history.push('/profile');
      default:
        return history.push('/');
    }
  }

  return (
    <header className="header">
      <div>
        <button
          className={sideMenu ? 'menuHide' : 'menu'}
          data-testid="top-hamburguer"
          onClick={() => setSideMenu(!sideMenu)}>
          <div></div>
          <div></div>
          <div></div>
        </button>
        <ul className={sideMenu ? 'menuInfoHide' : 'menuInfo side-menu-container'}>
          <li>
            <button type="button" name="products" data-testid="side-menu-item-products" onClick={handleClick}>
              Produtos
            </button>
          </li>
          <li>
            <button type="button" name="orders" data-testid="side-menu-item-my-orders" onClick={handleClick}>
              Meus Pedidos
            </button>
          </li>
          <li>
            <button type="button" name="profile" data-testid="side-menu-item-my-profile" onClick={handleClick}>
              Meu Perfil
            </button>
          </li>
          <li>
            <button type="button" name="login" data-testid="side-menu-item-logout" onClick={handleClick}>
              Sair
            </button>
          </li>
        </ul>
      </div>
      <h2 data-testid="top-title">{ headerTitle }</h2>
    </header>
  );
};

export default Header;

Header.propTypes = {
  headerTitle: PropTypes.string.isRequired,
}
