import React, { useState, useEffect } from 'react';
import SideBar from './SideBar';

function TopMenu() {
  const [showSideBar, setShowSideBar] = useState(false);
  useEffect(() => {
    console.log(showSideBar);
  }, [showSideBar]);
  return (
    <div>
      <button
        type="button"
        data-testid="top-hamburguer"
        onClick={ () => { setShowSideBar(true); } }
      >
        <img alt="hambeuger menu" src="https://img.icons8.com/ios-filled/50/000000/menu--v1.png" />
      </button>
      <h2 data-testid="top-title">Trybeer</h2>

      {showSideBar ? <SideBar /> : <div />}
    </div>
  );
}

export default TopMenu;
