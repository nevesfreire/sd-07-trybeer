import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

export default function Sidebar({ openAndClose }) {
  const [shouldRedirect, setShouldRedirect] = useState("");
  const redirectPage = (path) => {
    return <Redirect to={ path } />
  }

  return (
    <>
    { openAndClose
      && (
        <aside className="side-menu-container">
          { shouldRedirect !== "" && <Redirect to={ shouldRedirect } /> }
          <button
              data-testid="side-menu-item-products"
              type="button"
            onClick={ () => setShouldRedirect("/products") }
            >
              Produtos
          </button>
          <button
              data-testid="side-menu-item-my-orders"
              type="button"
              onClick={ () => setShouldRedirect("/orders") }
            >
              Meus Pedidos
          </button>
          <button
              data-testid="side-menu-item-my-profile"
              type="button"
              onClick={ () => setShouldRedirect("/profile") }
            >
              Meu Perfil
          </button>
          <button
              data-testid="side-menu-item-logout"
              type="button"
              onClick={ () => setShouldRedirect("/login") }
            >
              Sair
          </button>
        </aside> 
      )
    }
    </>
  );
}
