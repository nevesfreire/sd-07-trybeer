import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Global from '../context/index';
import '../css/menu.css';

const Menu = ({ path }) => {
  const {
    location: { pathname },
  } = path;
  const ADMIN_PAGE = '/admin/orders';
  const userPathname = pathname;

  const { menuState } = useContext(Global);
  return (
    <div
      className={
        menuState
          ? 'side-menu-container aside-menu-show'
          : 'side-menu-container aside-menu-hide'
      }
    >
      { userPathname !== ADMIN_PAGE ? (
        <div className={ menuState ? 'item-menu' : 'hide-menu' }>
          <Link to="/products" data-testid="side-menu-item-products">
            Produtos
          </Link>
        </div>
      ) : null }

      <div className={ menuState ? 'item-menu' : 'hide-menu' }>
        { userPathname !== ADMIN_PAGE ? (
          <Link to="/orders" data-testid="side-menu-item-my-orders">
            Meus pedidos
          </Link>
        ) : (
          <Link to="/admin/orders" data-testid="side-menu-item-orders">
            Meus pedidos
          </Link>
        ) }
      </div>

      <div className={ menuState ? 'item-menu' : 'hide-menu' }>
        { userPathname !== ADMIN_PAGE ? (
          <Link to="/profile" data-testid="side-menu-item-my-profile">
            Meu perfil
          </Link>
        ) : (
          <Link to="/admin/profile" data-testid="side-menu-item-profile">
            Meu perfil
          </Link>
        ) }
      </div>

      <div className={ menuState ? 'item-menu' : 'hide-menu' }>
        <Link to="/login" data-testid="side-menu-item-logout">
          Sair
        </Link>
      </div>
    </div>
  );
};

Menu.propTypes = {
  path: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Menu;
