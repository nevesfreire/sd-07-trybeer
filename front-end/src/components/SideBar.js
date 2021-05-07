import React from 'react';
import { Redirect } from 'react-router-dom';

const SideBar = () => (
  <aside>
    <button
      type="button"
      data-testid="side-menu-item-products"
      onClick={ () => <Redirect to="/products" /> }
    >
      Produtos
    </button>
    <button
      type="button"
      data-testid="side-menu-item-my-orders"
      onClick={ <Redirect to="/orders" /> }
    >
      Meus pedidos
    </button>
    <button
      type="button"
      data-testid="side-menu-item-my-profile"
      onClick={ <Redirect to="/profile" /> }
    >
      Meu Perfil
    </button>
    <button
      type="button"
      data-testid="side-menu-item-logout"
      onClick={ <Redirect to="/login" /> }
    >
      Sair
    </button>
  </aside>
);

export default SideBar;
