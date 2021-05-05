import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MenuSide from './MenuSide';
import menuHamburger from '../assets/bars-solid.svg';

function MenuTop({ title = 'TryBeer' }) {
  const [menuVisible, setMenuVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'admin') setIsAdmin(true);
  }, []);

  const menuTopClass = (isAdmin) ? 'menu-top-adm' : 'menu-top';

  return (
    <div className={ menuTopClass }>
      <div>
        <input
          data-testid="top-hamburguer"
          width="30rem"
          type="image"
          src={ menuHamburger }
          alt="menu hamburger icon"
          hidden={ isAdmin }
          onClick={ () => setMenuVisible(!menuVisible) }
        />
        <div data-testid="top-title">{ title }</div>
      </div>
      { (menuVisible || isAdmin) && <MenuSide isAdmin={ isAdmin } /> }
    </div>
  );
}

MenuTop.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MenuTop;
