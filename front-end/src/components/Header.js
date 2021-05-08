import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Sidebar from './Sidebar';

export default function Header({ title }) {
  const [checked, setChecked] = useState(false);
/*   const state = useSelector(({ header }) => header);
  const { hasSearchIcon, pageTitle, barIsShowing } = state;
  const history = useHistory();
  const dispatch = useDispatch(); */

  return (
    <>
      <div className="container-menu">
        <input
          type="checkbox"
          id="hamburger-menu"
          onChange={ () => setChecked(!checked) }
          defaultChecked={ checked }
        />
        <label className="hamburger-label" htmlFor="hamburger-menu" data-testid="top-hamburguer">
          <span className="hamburger-span"></span>
          <span className="hamburger-span"></span>
          <span className="hamburger-span"></span>
        </label>
      </div>
      <h1 data-testid="top-title">{ title }</h1>
      <Sidebar openAndClose={ checked } />
    </>
  );
}
