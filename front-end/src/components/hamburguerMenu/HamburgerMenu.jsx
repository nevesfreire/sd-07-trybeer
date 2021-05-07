import React from 'react';
import { Link } from 'react-router-dom';
import HamburgerButtom from './HamburgerButtom';

import './menuStyle.css';

export default function HamburgerMenu() {
  return (
    <nav className="hamburgerMenu">
      <ul>
        <li><HamburgerButtom /></li>
        <li><Link data-testid="side-menu-item-products" to="/products">Produtos</Link></li>
        <li><Link data-testid="side-menu-item-my-orders" to="/orders">Meus Pedidos</Link></li>
        <li><Link data-testid="side-menu-item-my-profile" to="/profile">Meu Perfil</Link></li>
        <li><Link data-testid="side-menu-item-logout" to="/">Sair</Link></li>
      </ul>
    </nav>
  );
}
