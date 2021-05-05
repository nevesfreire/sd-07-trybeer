import React from 'react';
import { Link } from 'react-router-dom';

function SideBarMobile() {
  return (
    <div className="side-menu-container">
      <div className="side-menu-link">
        <Link
          to="/products"
          data-testid="side-menu-item-products"
          className="sidebar-link"
        >
          Produtos
        </Link>
        <Link
          to="/orders"
          data-testid="side-menu-item-my-orders"
          className="sidebar-link"
        >
          Meus Pedidos
        </Link>
        <Link
          to="/profile"
          data-testid="side-menu-item-logout"
          className="sidebar-link"
        >
          Meu Perfil
        </Link>
      </div>
      <Link
        to="/login"
        data-testid="side-menu-item-logout"
        className="sidebar-logout"
      >
        Sair
      </Link>
    </div>
  );
}

export default SideBarMobile;
