import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

function MenuSide({ isAdmin }) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/login');
  };

  const adminRoute = (isAdmin) ? '/admin' : '';
  const menuClass = (isAdmin) ? 'admin-side-bar-container' : 'side-menu-container';

  return (
    <div className={ menuClass }>
      <button
        type="button"
        data-testid="side-menu-item-products"
        onClick={ () => history.push('/products') }
        hidden={ isAdmin }
      >
        Produtos
      </button>
      <button
        type="button"
        data-testid="side-menu-item-my-orders"
        onClick={ () => history.push(`${adminRoute}/orders`) }
      >
        { (isAdmin) ? 'Pedidos' : 'Meus Pedidos' }
      </button>
      <button
        type="button"
        data-testid="side-menu-item-my-profile"
        onClick={ () => history.push(`${adminRoute}/profile`) }
      >
        Meu Perfil
      </button>
      <button
        type="button"
        data-testid="side-menu-item-logout"
        onClick={ handleLogout }
      >
        Sair
      </button>
    </div>
  );
}

MenuSide.propTypes = {
  isAdmin: PropTypes.string.isRequired,
};

export default MenuSide;
