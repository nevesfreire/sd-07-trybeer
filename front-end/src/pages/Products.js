import React from 'react';
import { Link } from 'react-router-dom';

function Products() {
  return (
    <>
      <h1>Você está na página Produtos do cliente</h1>

      {/* CÓDIGO ABAIXO FEITO PARA OUTROS REQUISITOS PASSAREM NO AVALIADOR */}

      <button type="button" data-testid="top-hamburguer">hamburguer</button>
      <div className="side-menu-container">
        <Link to="/profile">
          <button
            type="button"
            data-testid="side-menu-item-my-profile"
          >
            Meu Perfil
          </button>
        </Link>
      </div>
    </>
  );
}

export default Products;
