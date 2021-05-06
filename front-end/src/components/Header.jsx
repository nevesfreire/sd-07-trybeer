import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [sideBar, setSideBar] = useState(false);

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
      </div>
      {sideBar
      && (
          <div>
            <div className="side-menu-container">
              <div>
                <Link
                  className="links"
                  to="/products"
                  data-testid="side-menu-item-products"
                >
                  Produtos
                </Link>
              </div>
              <div>
                <Link
                  className="links"
                  to="/orders"
                  data-testid="side-menu-item-my-orders"
                >
                  Meus Pedidos
                </Link>
              </div>
              <div>
                <Link
                  className="links"
                  to="/profile"
                  data-testid="side-menu-item-my-profile"
                >
                  Meu Perfil
                </Link>
              </div>
              <div>
                <button
                  type="submit"
                  onClick={ () => logout() }
                >
                  <Link
                    to="/login"
                    data-testid="side-menu-item-logout"
                    className="links"
                  >
                    Sair
                  </Link>
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Header;
