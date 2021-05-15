import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import menu from '../assets/images/menu.png';
import close from '../assets/images/close.png';

import './componentStyle.css';

function CustomTopMenu() {
  const [topMenu, setTopMenu] = useState(false);

  const toggleMenu = () => {
    const menuToggle = document.querySelector('.menuToggle');
    const navigation = document.querySelector('.navigation');

    setTopMenu(!topMenu);
    menuToggle.classList.toggle('active');
    navigation.classList.toggle('active');
  };

  return (
    <header>
      <div
        className="menuToggle"
        onClick={ toggleMenu }
        onKeyPress={ toggleMenu }
        data-testid="top-hamburguer"
        role="button"
        tabIndex={ 0 }
      >
        { topMenu
          ? <img src={ close } alt="menu" />
          : <img src={ menu } alt="menu" /> }
      </div>
      <ul className="navigation side-menu-container">
        <li
          className="menuItem"
          data-testid="side-menu-item-products"
        >
          <Link to="/products" onClick={ toggleMenu }>Produtos</Link>
        </li>
        <li
          className="menuItem"
          data-testid="side-menu-item-my-orders"
        >
          <Link to="/orders" onClick={ toggleMenu }>Meus pedidos</Link>
        </li>
        <li
          className="menuItem"
          data-testid="side-menu-item-my-profile"
        >
          <Link to="/profile" onClick={ toggleMenu }>Meu Perfil</Link>
        </li>
        <li
          className="menuItem leave"
          data-testid="side-menu-item-logout"
        >
          <Link to="/login" onClick={ toggleMenu }>Sair</Link>
        </li>
      </ul>
    </header>
  );
}

export default CustomTopMenu;
