import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ClientContext } from '../../services/context/client';
import { HamburgerButtom, HamburgerMenu } from '../hamburguerMenu';

import './sideBarStyle.css';

export default function SideBar({ title }) {
  const { clientState } = useContext(ClientContext);
  return (
    <header className="side-menu-container">
      {
        clientState.isHiddenMenu
          ? <HamburgerButtom />
          : <HamburgerMenu />
      }
      <h1>{title}</h1>
    </header>
  );
}

SideBar.propTypes = {
  title: PropTypes.string.isRequired,
};
