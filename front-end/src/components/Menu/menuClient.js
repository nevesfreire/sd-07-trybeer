import React from 'react';
import PropTypes from 'prop-types';
import { StyledMenu, Button } from './styles';

const MenuClient = ({ open }) => (
  <StyledMenu class="side-menu-container" open={ open }>

    <Button
      name="btn-products"
      to="/"
      data-testid="side-menu-item-products"
    >
      Produtos
    </Button>
    <Button
      name="btn-profile"
      to="/"
      data-testid="side-menu-item-my-orders"
    >
      Meus Pedidos
    </Button>
    <Button
      name="btn-myRequests"
      to="/"
      data-testid="side-menu-item-my-profile"
    >
      Meu Perfil
    </Button>
    <Button
      name="btn-exit"
      to="/"
      data-testid="side-menu-item-logout"
    >
      Sair
    </Button>
  </StyledMenu>
);

export default MenuClient;

MenuClient.propTypes = {
  open: PropTypes.bool.isRequired,
};
