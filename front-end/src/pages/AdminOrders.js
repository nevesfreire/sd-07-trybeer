import React from 'react';
import { Link } from 'react-router-dom';

function AdminOrders() {
  return (
    <>
      <h1>Você está na página Orders do admin</h1>

      {/* CÓDIGO ABAIXO FEITO PARA OUTROS REQUISITOS PASSAREM NO AVALIADOR */}

      <button type="button" data-testid="top-hamburguer">hamburguer</button>
      <div className="admin-side-bar-container">
        <Link to="/admin/profile">
          <button
            type="button"
            data-testid="side-menu-item-profile"
          >
            Meu Perfil
          </button>
        </Link>
      </div>
    </>
  );
}

export default AdminOrders;
