import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import StyledMenu from '../styled/Menu.styled';

const Menu = ({ open, ...props }) => {
  const isHidden = open ? true : false;
  // const tabIndex = isHidden ? 0 : -1;

  return (
    <StyledMenu
      open={ open }
      aria-hidden={ !isHidden }
      { ...props }
      className={ isHidden && 'side-menu-container' }
    >
      <Link to="/products" data-testid="side-menu-item-products">
        Produtos
      </Link>
      <Link to="/orders" data-testid="side-menu-item-my-orders">
        Meus Pedidos
      </Link>
      <Link to="/profile" data-testid="side-menu-item-my-profile">
        Meu Perfil
      </Link>
      <Link to="/" data-testid="side-menu-item-logout">
        Sair
      </Link>
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
};

export default Menu;
