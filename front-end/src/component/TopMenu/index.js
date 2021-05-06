import react from 'react';
import './style.css';

export default function TopMenu() {
  return (
    <div class="header">
      <div class="header-title" data-testid="top-title">
        Titulo
      </div>
      <div class="nav-container">
        <div class="nav-item">
          Produtos
        </div>
        <div class="nav-item">
          Meus Pedidos
        </div>
        <div class="nav-item">
          Meu Perfil
        </div>
        <div class="nav-exit">
          Sair
        </div>
      </div>
    </div>
  );
}
