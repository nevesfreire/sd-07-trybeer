import React, { useEffect } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import verifyUserLocalStorage from '../../util/changeLocalStorage';

export default function SideBar({ role }) {
  const history = useHistory();

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    if (!data) {
      localStorage.clear();
      return history.push('/login');
    }
  }, [history]);

  if (role === 'administrator') {
    return (
      <div data-testid="side-bar-container" className="side-bar-container">
        <Link data-testid="side-menu-item-orders" to="/admin/orders">
          Pedidos
        </Link>
        <Link data-testid="side-menu-item-profile" to="/admin/profile">
          Perfil
        </Link>
        <Link
          data-testid="side-menu-item-logout"
          to="/login"
          onClick={ () => localStorage.clear() }
        >
          Sair
        </Link>
      </div>
    );
  }
  return (
    <div data-testid="side-menu-container" className="side-menu-container">
      <Link data-testid="side-menu-item-products" to="/products">
        Produtos
      </Link>
      <Link data-testid="side-menu-item-my-orders" to="/orders">
        Meus pedidos
      </Link>
      <Link data-testid="side-menu-item-my-profile" to="/profile">
        Meu Perfil
      </Link>
      <Link
        data-testid="side-menu-item-logout"
        to="/login"
        onClick={ () => localStorage.clear() }
      >
        Sair
      </Link>
    </div>
  );
}

SideBar.propTypes = {
  role: propTypes.string.isRequired,
};
