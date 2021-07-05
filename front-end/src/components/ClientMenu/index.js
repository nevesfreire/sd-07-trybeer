import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Context } from '../../context';

import ClientSidebar from '../ClientSidebar';
import { ReactComponent as MenuIcon } from '../../images/menu.svg';

import './styles.css';

const ClientMenu = ({ title = 'TryBeer' }) => {
  const { menuOpen, setMenuOpen } = useContext(Context);

  return (
    <nav className="main-nav">
      <button
        type="button"
        onClick={ () => setMenuOpen(!menuOpen) }
      >
        <MenuIcon data-testid="top-hamburguer" />
      </button>
      <h1 data-testid="top-title">{title}</h1>
      <ClientSidebar />
    </nav>
  );
};

ClientMenu.defaultProps = {
  title: 'TryBeer',
};

ClientMenu.propTypes = {
  title: PropTypes.string,
};

export default ClientMenu;
