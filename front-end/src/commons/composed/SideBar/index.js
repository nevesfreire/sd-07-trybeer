import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

function SideBar({ history, isAdmin = false }) {
  if (!isAdmin) {
    return (
      <div className="side-menu-container">
        <button
          type="button"
          data-testid="side-menu-item-products"
          onClick={ () => history.push('/products') }
        >
          Produtos
        </button>
        <button
          type="button"
          data-testid="side-menu-item-my-orders"
          onClick={ () => history.push('/orders') }
        >
          Meus Pedidos
        </button>
        <button
          type="button"
          data-testid="side-menu-item-my-profile"
          onClick={ () => history.push('/profile') }
        >
          Meu Perfil
        </button>
        <button
          type="button"
          data-testid="side-menu-item-logout"
          onClick={ () => history.push('/login') }
        >
          Sair
        </button>
      </div>
    );
  }
  return (
    <div className="admin-side-bar-container">
      <h1>Trybeer</h1>
      <button
        type="button"
        data-testid="side-menu-item-orders"
        onClick={ () => history.push('/admin/orders') }
      >
        Meus Pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-profile"
        onClick={ () => history.push('/admin/profile') }
      >
        Meu Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ () => history.push('/login') }
      >
        Sair
      </button>
    </div>
  );
}

SideBar.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

export default withRouter(SideBar);
