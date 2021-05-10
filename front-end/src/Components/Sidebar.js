import React from 'react';

function SideBar() {
  return(
    <div class="side-menu-container">
      <a
        data-testid="side-menu-item-products"
        href="/products"
      > Produtos
      </a>
      <br />
      <a
        data-testid="side-menu-item-my-orders"
        href="/orders"
      > Meus Pedidos
      </a>
      <br />
      <a
        href="/profile"
        data-testid="side-menu-item-my-profile"
      > Meu Perfil
      </a>
      <br />
      <a
        href="/" 
        data-testid="side-menu-item-logout"
      >Sair
      </a>
      <br />
    </div>
  )
};

export default SideBar;
