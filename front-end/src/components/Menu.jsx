import React from 'react';
import { bool } from 'prop-types';
import { Link } from 'react-router-dom';
import StyledMenu from '../styled/Menu.styled';

const Menu = ({ open, isAdmin, ...props }) => {
  const isHidden = open;

  return (
    <StyledMenu
      open={ open }
      aria-hidden={ !isHidden }
      { ...props }
      isAdmin={ isAdmin }
      className={ isHidden && 'side-menu-container' }
    >
      { isAdmin ? (
        <>
          <Link to="/admin/orders" data-testid="side-menu-item-orders">
            Pedidos
          </Link>
          <Link to="/admin/profile" data-testid="side-menu-item-profile">
            Perfil
          </Link>
          <Link to="/" data-testid="side-menu-item-logout">
            Sair
          </Link>
        </>
      ) : (
        <>
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
        </>
      )}
    </StyledMenu>
  );
};

Menu.propTypes = {
  open: bool.isRequired,
  isAdmin: bool.isRequired,
};

export default Menu;
