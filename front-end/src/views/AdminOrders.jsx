import React from 'react';
import { useHistory } from 'react-router';

export default function AdminOrders() {
  const history = useHistory();
  return (
    <div>
      <h1>Admin-pedidos</h1>
      {/* Botão para requisito 10 - REMOVER */}
      <button
        type="button"
        data-testid="side-menu-item-profile"
        onClick={ () => history.push('/admin/profile') }
      >
        Perfil
      </button>
    </div>
  );
}
