import React from 'react';
import { scaleRotate as Menu } from 'react-burger-menu';
import './SideBar.css';

export default function SideBar() {
  return (
    <div id="outer-container">
      <Menu width="20%" data-testid="top-hamburguer">
        <a
          className="menu-item"
          href="/products"
          data-testid="side-menu-item-products"
        >
          Produtos
        </a>
        <a
          className="menu-item"
          href="/orders"
          data-testid="side-menu-item-my-orders"
        >
          Meus Pedidos
        </a>
        <a
          className="menu-item"
          href="/profile"
          data-testid="side-menu-item-my-profile"
        >
          Meu Perfil
        </a>
        <a
          className="menu-item"
          href="/login"
          data-testid="side-menu-item-logout"
        >
          Sair
        </a>
      </Menu>
    </div>
  );
}
