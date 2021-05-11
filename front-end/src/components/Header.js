import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import 'bulma/css/bulma.min.css';

import logo from '../img/logo.svg';

const burguerViewer = () => {
  const showMenu = document.querySelector('#navMenu');
  showMenu.classList.toggle('is-active');
  showMenu.classList.toggle('is-hidden');
};

function Header({ title }) {
  return (
    <nav
      className="navbar is-warning is-fixed-top"
      role="navigation"
      aria-label="main navigation"
    >
      <button type="button" className="button-burguer" onClick={ () => burguerViewer() }>
        <div
          data-testid="top-hamburguer"
          role="button"
          className="navbar-burger is-flex-tablet"
          aria-label="menu"
          aria-expanded="false"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
      </button>
      <div
        className="side-menu-container
        navbar-item has-dropdown is-hoverable is-hidden"
        id="navMenu"
      >
        <div className="navbar-dropdown">
          <Link
            to="/products"
            className="navbar-item"
            data-testid="side-menu-item-products"
            onClick={ () => burguerViewer() }
          >
            Produtos
          </Link>
          <Link
            to="/orders"
            className="navbar-item is-expanded"
            data-testid="side-menu-item-my-orders"
            onClick={ () => burguerViewer() }
          >
            Meus Pedidos
          </Link>
          <Link
            to="/profile"
            className="navbar-item"
            data-testid="side-menu-item-my-profile"
            onClick={ () => burguerViewer() }
          >
            Meu Perfil
          </Link>
          <Link
            to="/login"
            className="navbar-item"
            data-testid="side-menu-item-logout"
            onClick={ () => burguerViewer() }
          >
            Sair
          </Link>
        </div>
        <div className="navbar-item">
          <div className="navbar-item">
            {/* 1 */}
          </div>
        </div>
      </div>
      <div className="navbar-end">
        <span data-testid="top-title">{ title }</span>
        <img src={ logo } alt="Group-4" width="150" height="50" />
      </div>
    </nav>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
