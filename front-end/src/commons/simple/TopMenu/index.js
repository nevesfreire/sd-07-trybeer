import React, { useState } from 'react';
import PropTypes from 'prop-types';

import SideBar from '../../composed/SideBar';

function TopMenu({ title }) {
  const [isSideBarVisible, setIsSideBarVisible] = useState(false);

  return (
    <div>
      <button type="button" onClick={ () => setIsSideBarVisible(!isSideBarVisible) }>
        <h1 data-testid="top-hamburguer">Hamb</h1>
      </button>
      <h1 data-testid="top-title">{title}</h1>
      <div>
        { isSideBarVisible && <SideBar /> }
      </div>
    </div>
  );
}

TopMenu.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TopMenu;
