import React from 'react';

function SideBarAdm() {
  return (
    <div className="admin-side-bar-container">
      <a
        data-testid="side-menu-item-orders"
        href="/admin/orders"
      >
        {' '}
        Pedidos
      </a>
      <br />
      <a
        data-testid="side-menu-item-profile"
        href="/admin/profile"
      >
        {' '}
        Perfil
      </a>
      <br />
      <a
        data-testid="side-menu-item-logout"
        href="/"
      >
        Sair
      </a>
      <br />
    </div>
  );
}

export default SideBarAdm;
