import React from 'react';
import StyledMenu from './Menu.styled';

const MenuAdmin = () => (
  <StyledMenu
    className="admin-side-bar-container"
  >
    <a
      href="/admin/orders"
      data-testid="side-menu-item-orders"
    >
      <span aria-hidden="true">📝</span>
      Pedidos
    </a>
    <a
      href="/admin/profile"
      data-testid="side-menu-item-profile"
    >
      <span aria-hidden="true">👤</span>
      Meu Perfil
    </a>
    <a
      href="/login"
      data-testid="side-menu-item-logout"
    >
      <span aria-hidden="true">❌</span>
      Sair
    </a>
  </StyledMenu>
);

export default MenuAdmin;
