import React from 'react';
import { bool } from 'prop-types';
import StyledMenu from './Menu.styled';

const MenuAdmin = ({ open, ...props }) => {
  const ONE = -1;
  const isHidden = !!open;
  const tabIndex = isHidden ? 0 : ONE;

  return (
    <StyledMenu
      className="admin-side-bar-container"
      open={ open }
      aria-hidden={ !isHidden }
      { ...props }
    >
      <a
        href="/orders"
        data-testid="side-menu-item-orders"
        tabIndex={ tabIndex }
      >
        <span aria-hidden="true">📝</span>
        Pedidos
      </a>
      <a
        href="/profile"
        data-testid="side-menu-item-profile"
        tabIndex={ tabIndex }
      >
        <span aria-hidden="true">👤</span>
        Meu Perfil
      </a>
      <a
        href="/login"
        data-testid="side-menu-item-logout"
        tabIndex={ tabIndex }
      >
        <span aria-hidden="true">❌</span>
        Sair
      </a>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default MenuAdmin;
