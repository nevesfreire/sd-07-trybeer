import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import SideBar from './SideBar';

function TopMenu({ children }) {
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    // console.log(showSideBar);
  }, [showSideBar]);
  return (
    <div>
      <button
        type="button"
        data-testid="top-hamburguer"
        onClick={ () => setShowSideBar(!showSideBar) }
      >
        Boar
      </button>
      <h2
        data-testid="top-title"
      >
        {children === 'Produtos' || children === undefined ? 'TryBeer' : children}
      </h2>
      {showSideBar ? <SideBar /> : <div />}
    </div>
  );
}

TopMenu.propTypes = {
  children: propTypes.node.isRequired,
};

export default TopMenu;
