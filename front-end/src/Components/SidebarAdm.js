import React from 'react';
import { useHistory } from 'react-router-dom';

function SideBarAdm() {
  const history = useHistory();

  return (
    <div className="admin-side-bar-container">
      <button
        type="button"
        data-testid="side-menu-item-orders"
        onClick={ () => {
          history.push('/admin/orders');
        } }
      >
        Pedidos
      </button>
      <br />
      <button
        type="button"
        data-testid="side-menu-item-profile"
        onClick={ () => {
          history.push('/admin/profile');
        } }
      >
        Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ () => {
          history.push('/');
        } }
      >
        Sair
      </button>
    </div>
  );
}

export default SideBarAdm;
