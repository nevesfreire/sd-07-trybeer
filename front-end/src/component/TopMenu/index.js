import React from 'react';
import { Link } from 'react-router-dom';
//import { Header } from './styles';
import './style.css';

export default function TopMenu() {
  
  function handleMenuToggle() {
    document.getElementsByClassName('side-menu-container')[0].classList.toggle('show-menu');
    document.getElementsByClassName('nav-complement')[0].classList.toggle('nav-complement-show');
  }

  return (
    <div className="header">
      <div className="header-title" data-testid="top-title">
        Título
      </div>
      <div
        className="nav-complement"
        onClick={() => handleMenuToggle()}
      />
      <div className="side-menu-container">
        <div
          className="nav-close"
          onClick={() => handleMenuToggle()}
        >
          <h3>&#9587;</h3>
        </div>
        <div className="nav-item" data-testid="side-menu-item-products">
          <Link to="/products">
            Produtos
          </Link>
          
        </div>
        <div className="nav-item" data-testid="side-menu-item-my-orders">
          <Link to="/orders">
            Meus Pedidos
          </Link>
        </div>
        <div className="nav-item" data-testid="side-menu-item-my-profile">
          <Link to="/profile">
            Meu Perfil
          </Link>
        </div>
        <div className="logoff-button" data-testid="side-menu-item-logout">
          <Link to="/">
            Sair
          </Link>
        </div>
      </div>
      <div
        className="menu-button"
        data-testid="top-hamburguer"
        onClick={() => handleMenuToggle()}
      >
        <h3>&#9776;</h3>
      </div>
    </div>
  );
}
