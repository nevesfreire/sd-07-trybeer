import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import './style.css';

export default function TopMenu({ title }) {
  const history = useHistory();

  function handleMenuToggle() {
    const sideBar = document.getElementsByClassName('side-menu-container')[0];
    const sideBarComplement = document.getElementsByClassName('nav-complement')[0];

    sideBar.classList.toggle('show-menu');
    sideBarComplement.classList.toggle('nav-complement-hide');
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

  useEffect(() => {
    if (title.toLowerCase() === 'trybeer') {
      document.getElementById('title')
        .classList.add('header-title-trybeer');
    } else {
      document.getElementById('title')
        .classList.remove('header-title-trybeer');
    }
  }, [title]);

  return (
    <div className="header">
      <div id="title" className="header-title" data-testid="top-title">
        { title }
      </div>
      <div
        className="nav-complement nav-complement-hide"
        onClick={ () => {
          if (document.getElementsByClassName('nav-complement')[0]
            .classList[1] === 'nav-complement-show') {
            handleMenuToggle();
          }
        } }
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

TopMenu.propTypes = {
  title: PropTypes.string.isRequired,
};
