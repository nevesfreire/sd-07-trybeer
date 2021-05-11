import React, { useState } from 'react';
import { Link } from 'react-router';
import '../css/menu.css';
import IconMenu from '../image/icon-menu.svg';

const Menu = (aplicationName) => {
  const { menuState, setStateMenu } = useState(false);

  const actionMenu = () => {
    setStateMenu(true);
  };

  return (
    <div
      className={
        menuState
          ? `side-menu-container ${aside - menu - show}`
          : `side-menu-container ${aside - menu - show}`
      }
    >
      <div className="menu-int">
        <Link
          to="/products"
          className="item-menu"
          data-testid="side-menu-item-products"
        >
          Produtos
        </Link>
        <Link
          to="/pedidos"
          className="item-menu"
          data-testid="side-menu-item-my-orders"
        >
          Meus Pedidos
        </Link>
        <Link
          to="/perfil"
          className="item-menu"
          data-testid="side-menu-item-my-profile"
        >
          Meu Perfil
        </Link>
        <Link to="/" className="item-menu" data-testid="side-menu-item-logout">
          Sair
        </Link>
      </div>
      <h1 data-testid="top-title">{aplicationName}</h1>
      <div className="hambuger-menu">
        <buttom type="buttom" onClick={ () => actionMenu() }>
          <img src={ IconMenu } alt="Menu" className="hamburguer-menu" />
        </buttom>
      </div>
    </div>
  );
};

export default Menu;
