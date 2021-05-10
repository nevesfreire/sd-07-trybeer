import React from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, StyledMenu } from './styles';

function MenuAdmin({ open }) {
  const history = useHistory();

  return (
    <StyledMenu class="admin-side-bar-container" open={ !open }>
      <Button
        name="btn-requests"
        onClick={ () => history.push('/admin/orders') }
        data-testid="side-menu-item-orders"
      >
        Pedidos
      </Button>
      <Button
        name="btn-profile"
        onClick={ () => history.push('/admin/profile') }
        data-testid="side-menu-item-profile"
      >
        Perfil
      </Button>
      <Button
        name="btn-exit"
        onClick={ () => {
          history.push('/login');
          localStorage.clear();
        }}
        data-testid="side-menu-item-logout"
      >
        Sair
      </Button>
    </StyledMenu>
  );
}

export default MenuAdmin;

MenuAdmin.propTypes = {
  open: PropTypes.bool.isRequired,
};
