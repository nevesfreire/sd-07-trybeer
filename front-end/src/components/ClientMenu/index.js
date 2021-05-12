import React, { useContext } from 'react';
import { Context } from '../../context';
import ClientSidebar from '../ClientSidebar';
import { ReactComponent as MenuIcon } from '../../images/menu.svg';

import './styles.css';

const ClientMenu = () => {
  const { menuOpen, setMenuOpen } = useContext(Context);

  return (
    <nav className="main-nav">
      <button
        type="button"
        onClick={ () => setMenuOpen(!menuOpen) }
      >
        <MenuIcon data-testid="top-hamburguer" />
      </button>
      <h1 data-testid="top-title">TryBeer</h1>
      <ClientSidebar />
    </nav>
  );
};

export default ClientMenu;
