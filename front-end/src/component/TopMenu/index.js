import React from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import './style.css';

export default function TopMenu() {
  const history = useHistory();

  function handleMenuToggle() {
    const sideBar = document.getElementsByClassName('side-menu-container')[0];
    const sideBarComplement = document.getElementsByClassName('nav-complement')[0];
    sideBar.classList.toggle('show-menu');
    sideBarComplement.classList.toggle('nav-complement-show');
  }

  function link(url) {
    history.push(url);
  }

  return (
    <div className="header">
      <div className="header-title" data-testid="top-title">
        Título
      </div>
      <div
        className="nav-complement"
        onClick={ () => handleMenuToggle() }
      />
      <div className="side-menu-container">
        <div
          className="nav-close"
          onClick={ () => handleMenuToggle() }
        >
          <h3>&#9587;</h3>
        </div>
        <div
          className="nav-item"
          data-testid="side-menu-item-products"
          onClick={ () => link('/products') }
        >
          Produtos
        </div>
        <div
          className="nav-item"
          data-testid="side-menu-item-my-orders"
          onClick={ () => link('/orders') }
        >
          Meus Pedidos
        </div>
        <div
          className="nav-item"
          data-testid="side-menu-item-my-profile"
          onClick={ () => link('/profile') }
        >
          Meu Perfil
        </div>
        <div
          className="logoff-button"
          data-testid="side-menu-item-logout"
          onClick={ () => link('/') }
        >
          Sair
        </div>
      </div>
      <div
        className="menu-button"
        data-testid="top-hamburguer"
        onClick={ () => handleMenuToggle() }
      >
        <h3>&#9776;</h3>
      </div>
    </div>
  );
}
