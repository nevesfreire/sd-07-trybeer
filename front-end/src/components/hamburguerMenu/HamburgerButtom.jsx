import React, { useContext } from 'react';
import { ClientContext, CHANGE_MENU } from '../../services/context/client';
import icon from './icons8-cardápio-48.png';
import './HamburgerMenu';

export default function HamburgerButtom() {
  const { dispatch } = useContext(ClientContext);
  return (
    <button
      type="button"
      onClick={ () => dispatch({ type: CHANGE_MENU }) }
      className="hamburgerButton"
      data-testid="top-hamburguer"
    >
      <img src={ icon } alt="menu" />
    </button>
  );
}
