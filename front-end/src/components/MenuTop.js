import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MenuSide from './MenuSide';
import menuHamburger from '../assets/bars-solid.svg';

function MenuTop({ title = 'TryBeer' }) {
  const [menuHidden, setMenuHidden] = useState(true);

  return (
    <div>
      <input
        data-testid="top-hamburguer"
        width="30rem"
        type="image"
        src={ menuHamburger }
        alt="menu hamburger icon"
        onClick={ () => setMenuHidden(!menuHidden) }
      />
      <div data-testid="top-title">{ title }</div>
      { (menuHidden) && <MenuSide /> }
    </div>
  );
}

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MenuTop;
