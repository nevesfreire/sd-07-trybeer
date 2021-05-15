import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Global from '../context/index';
import '../css/menu.css';

const Menu = ({path}) => {
  let althernativeClassName;
  const { location: { pathname } } = path;

  const { menuState, setMenuState } = useContext(Global);

  useEffect(() => {
    if (pathname === '/admin/orders') {
      setMenuState(true);
    }
  }, []);

  if (pathname === '/admin/orders') {
    althernativeClassName = 'admin-side-bar-container';
  } else {
    althernativeClassName = 'side-menu-container';
  }

  return (
    <div
      className={
        menuState
          ? `${althernativeClassName} aside-menu-show`
          : `${althernativeClassName} aside-menu-hide`
      }
    >
      { pathname !== '/admin/orders'?
        <div className={ menuState ? 'item-menu' : 'hide-menu' }>
          <Link to="/products" data-testid="side-menu-item-products">
            Produtos
          </Link>
        </div>
        : null
      }
      <div className={ menuState ? 'item-menu' : 'hide-menu' }>
        { 
          pathname !== '/admin/orders'?
            <Link to="/orders" data-testid="side-menu-item-my-orders">
              Meus pedidos
            </Link> 
            :
            <Link to="/admin/orders" data-testid="side-menu-item-orders">
              Meus pedidos
            </Link>
        }
      </div>
      <div className={ menuState ? 'item-menu' : 'hide-menu' }>
        {
          pathname !== '/admin/orders'?
            <Link to="/profile" data-testid="side-menu-item-my-profile">
              Meu perfil
            </Link>
            :
            <Link to="/admin/profile" data-testid="side-menu-item-profile">
              Meu perfil
            </Link>
        }
      </div>
      <div className={ menuState ? 'item-menu' : 'hide-menu' }>
        <Link to="/login" data-testid="side-menu-item-logout">
          Sair
        </Link>
      </div>
    </div>
  );
};

export default Menu;
