import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [sideBar, setSideBar] = useState(true);

  const logout = () => {
    localStorage.clear();
  };

  return (
    <div>
      <div className="header">
        <button
          type="submit"
          onClick={ () => setSideBar(!sideBar) }
          data-testid="top-hamburguer"
          className="hameburgerButton"
        >
          <Hamburger easing="ease-in" />
        </button>
        <h2 data-testid="top-title">TryBeer</h2>
        <div />
      </div>
      {sideBar
        && (
          <div>
            <div className="side-menu-container">
              <div className="itensHamburguer">
                <Link
                  className="linksHamburguer"
                  to="/admin/orders"
                  data-testid="side-menu-item-orders"
                >
                  Pedidos
                </Link>
              </div>
              <div className="itensHamburguer">
                <Link
                  className="linksHamburguer"
                  to="/admin/profile"
                  data-testid="side-menu-item-profile"
                >
                  Meu Perfil
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={ () => logout() }
                  className="buttonLogOut"
                >
                  <Link
                    to="/login"
                    data-testid="side-menu-item-logout"
                    className="linksHamburguer"
                  >
                    Sair
                  </Link>
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Header;
