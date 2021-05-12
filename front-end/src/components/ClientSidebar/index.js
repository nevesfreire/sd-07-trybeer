import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context';

import { handleLogout } from '../../services/localStorage';

import './styles.css';

const ClientSidebar = () => {
  const { menuOpen, setMenuOpen } = useContext(Context);
  const history = useHistory();

  const menu = 'side-menu-container';
  const menuActive = 'side-menu-container side-menu-active';

  const handleRoute = (path) => {
    if (path === '/login') handleLogout();
    history.push(path);
    setMenuOpen(false);
  };

  return (
    <div className={ menuOpen ? menuActive : menu }>
      <button
        type="button"
        data-testid="side-menu-item-products"
        onClick={ () => handleRoute('/products') }
      >
        Produtos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-my-orders"
        onClick={ () => handleRoute('/orders') }
      >
        Meus pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-my-profile"
        onClick={ () => handleRoute('/profile') }
      >
        Meu Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ () => handleRoute('/login') }
      >
        Sair
      </button>
    </div>
  );
};

export default ClientSidebar;
