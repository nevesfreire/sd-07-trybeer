import React from 'react';
import PropTypes from 'prop-types';
import { Button, StyledMenu } from './styles';

export const MenuAdmin = ({ open }) => (
  <StyledMenu class="side-menu-container" open={ open }>
    <Button
      name="btn-requests"
      to="/"
      data-testid="btn-requests"
    >
      Pedidos
    </Button>
    <Button
      name="btn-profile"
      to="/"
      data-testid="btn-profile"
    >
      Perfil
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

export default MenuAdmin;

MenuAdmin.propTypes = {
  open: PropTypes.bool.isRequired,
};
