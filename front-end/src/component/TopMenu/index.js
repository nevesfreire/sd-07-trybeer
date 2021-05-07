import React from 'react';
import { useHistory } from 'react-router-dom';
import './style.css';

export default function TopMenu() {
  const history = useHistory();

  function handleMenuToggle() {
    const sideBar = document.getElementsByClassName('side-menu-container')[0];
    const sideBarComplement = document.getElementsByClassName('nav-complement')[0];
    sideBar.classList.toggle('show-menu');
    sideBarComplement.classList.toggle('nav-complement-show');
  }

  const twentySeven = 27;

  function getKeyCode(e) {
    if (e.keyCode === twentySeven) {
      handleMenuToggle();
    }
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
        onKeyDown={ (e) => getKeyCode(e) }
        aria-hidden="true"
      />
      <div
        className="side-menu-container"
      >
        <div
          className="nav-close"
          onClick={ () => handleMenuToggle() }
          onKeyDown={ (e) => getKeyCode(e) }
          aria-hidden="true"
        >
          <h3>&#9587;</h3>
        </div>
        <div
          className="nav-item"
          data-testid="side-menu-item-products"
          onClick={ () => link('/products') }
          onKeyDown={ (e) => getKeyCode(e) }
          aria-hidden="true"
        >
          Produtos
        </div>
        <div
          className="nav-item"
          data-testid="side-menu-item-my-orders"
          onClick={ () => link('/orders') }
          onKeyDown={ (e) => getKeyCode(e) }
          aria-hidden="true"
        >
          Meus Pedidos
        </div>
        <div
          className="nav-item"
          data-testid="side-menu-item-my-profile"
          onClick={ () => link('/profile') }
          onKeyDown={ (e) => getKeyCode(e) }
          aria-hidden="true"
        >
          Meu Perfil
        </div>
        <div
          className="logoff-button"
          data-testid="side-menu-item-logout"
          onClick={ () => link('/') }
          onKeyDown={ (e) => getKeyCode(e) }
          aria-hidden="true"
        >
          Sair
        </div>
      </div>
      <div
        className="menu-button"
        data-testid="top-hamburguer"
        onClick={ () => handleMenuToggle() }
        onKeyDown={ (e) => getKeyCode(e) }
        aria-hidden="true"
      >
        <h3>&#9776;</h3>
      </div>
    </div>
  );
}
