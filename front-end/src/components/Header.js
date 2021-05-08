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
        onClick={ () => { setShowSideBar(!showSideBar); } }
      >
        <img alt="hambeuger menu" src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png" />
      </button>
      <h2 data-testid="top-title">{children === 'Produtos' ? 'Trybeer' : children}</h2>

      {showSideBar ? <SideBar class="side-menu-container" /> : <div />}
    </div>
  );
}

TopMenu.propTypes = {
  children: propTypes.node.isRequired,
};

export default TopMenu;
