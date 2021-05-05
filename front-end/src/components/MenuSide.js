import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function MenuSide() {
  const [isAdmin, setIsAdmin] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') setIsAdmin(true);
  }, []);

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

export default MenuSide;
