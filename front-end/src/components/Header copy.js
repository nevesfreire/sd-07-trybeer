import React from 'react';
import { Link } from 'react-router-dom';

import 'bulma/css/bulma.min.css';

import logo from '../img/logo.svg';

const burguerViewer = () => {
  const showMenu = document.querySelector('#navMenu');
  showMenu.classList.toggle('is-active');
};

function Header() {
  return (
    <nav
      className="navbar is-warning is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div>
          <img
            src={ logo }
            className="container-image is-hidden-touch"
            alt="Grupo Undefined"
            width="110"
            height="50"
          />
        </div>
        <Link to="/" onClick={ () => burguerViewer() }>
          <div
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </div>
        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-start">
          <Link
            to="/"
            className="navbar-item"
            data-testid="side-menu-item-products"
          >
            Produtos
          </Link>
          <Link
            to="/"
            className="navbar-item"
            data-testid="side-menu-item-my-orders"
          >
            Meus Pedidos
          </Link>
          <Link
            to="/"
            className="navbar-item"
            data-testid="side-menu-item-my-profile"
          >
            Meu Perfil
          </Link>
          <br />
          <div className="navbar-item">
            <Link
              to="/"
              className="button is-warning"
              data-testid="side-menu-item-logout"
            >
              Sair
            </Link>
          </div>
        </div>
      </div>
      <div className="side-menu-container navbar-menu is-hidden-desktop" id="navMenu">
        <div className="navbar">
          <Link
            to="/"
            className="navbar-item"
            data-testid="side-menu-item-products"
          >
            Produtos
          </Link>
          <Link
            to="/"
            className="navbar-item is-expanded"
            data-testid="side-menu-item-my-orders"
          >
            Meus Pedidos
          </Link>
          <Link
            to="/"
            className="navbar-item"
            data-testid="side-menu-item-my-profile"
          >
            Meu Perfil
          </Link>
        </div>
      </div>
      <div className="navbar-end is-hidden-touch">
        <div className="navbar-item">
          <Link
            to="/"
            className="button is-warning"
            data-testid="side-menu-item-logout"
          >
            Sair
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
