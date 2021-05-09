import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import menuHamburguer from '../menuHamburguer.png';
import menuClose from '../menuClose.png';

export default function TopBar({ title }) {
  const [menuCtrl, setMenuCtrl] = useState(false);
  return (
    <div>
      <div>
        <input
          alt="menu"
          data-testid="top-hamburguer"
          onClick={ () => setMenuCtrl(!menuCtrl) }
          src={ menuCtrl ? menuClose : menuHamburguer }
          type="image"
          width="30px"
        />
        <h1 data-testid="top-title">{title}</h1>
      </div>
      <div
        className="side-menu-container"
        style={ {
          position: 'fixed',
          visibility: (menuCtrl ? 'visible' : 'hidden'),
        } }
      >
        <div>
          <Link
            data-testid="side-menu-item-products"
            to="/products"
          >
            Produtos
          </Link>
        </div>
        <div>
          <Link
            data-testid="side-menu-item-my-orders"
            to="/orders"
          >
            Meus pedidos
          </Link>
        </div>
        <div>
          <Link
            data-testid="side-menu-item-my-profile"
            to="/profile"
          >
            Meu Perfil
          </Link>
        </div>
        <div>
          <Link
            data-testid="side-menu-item-logout"
            to="/login"
          >
            Sair
          </Link>
        </div>
      </div>
    </div>
  );
}

TopBar.defaultProps = {
  title: 'TryBeer',
};

TopBar.propTypes = {
  title: PropTypes.string,
};
