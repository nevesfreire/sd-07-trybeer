import React from 'react';
import { bool } from 'prop-types';
import StyledMenu from './Menu.styled';

const Menu = ({ open, ...props }) => {
  const ONE = -1;
  const isHidden = !!open;
  const tabIndex = isHidden ? 0 : ONE;

  return (
    <StyledMenu
      className="side-menu-container"
      open={ open }
      aria-hidden={ !isHidden }
      { ...props }
    >
      <a
        href="/products"
        data-testid="side-menu-item-products"
        tabIndex={ tabIndex }
      >
        <span aria-hidden="true">🍺</span>
        Produtos
      </a>
      <a
        href="/orders"
        data-testid="side-menu-item-my-orders"
        tabIndex={ tabIndex }
      >
        <span aria-hidden="true">📝</span>
        Meus Pedidos
      </a>
      <a
        href="/profile"
        data-testid="side-menu-item-my-profile"
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

export default Menu;
