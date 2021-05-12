import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context } from '../../context';

import './styles.css';

const AdminSidebar = () => {
  const { setMenuOpen } = useContext(Context);
  const history = useHistory();
  const handleRoute = (path) => {
    if (path === '/login') {
      localStorage.removeItem('token');
    }
    history.push(path);
    setMenuOpen(false);
  };
  return (
    <div className="admin-side-bar-container">
      <h1>Trybeer</h1>
      <button
        type="button"
        data-testid="side-menu-item-orders"
        onClick={ () => handleRoute('/admin/orders') }
      >
        Pedidos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-profile"
        onClick={ () => handleRoute('/admin/profile') }
      >
        Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ () => handleRoute('/login') }
      >
        Sair
      </button>
    </div>
  );
};

export default AdminSidebar;
