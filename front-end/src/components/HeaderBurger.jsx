import React, { useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import PropTypes from 'prop-types';
import Burger from './Burger';
import Menu from './Menu';
import useOnClickOutside from '../hooks/useClick';
import styles from '../styled/HeaderBurger.module.css';

export default function HeaderBurguer({ titulo, isAdmin }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = 'main-menu';

  useOnClickOutside(node, () => setOpen(false));

  return (
    isAdmin ? (
      <>
        <Menu
          open
          setOpen={ setOpen }
          id={ menuId }
          isAdmin
          className="admin-side-bar-container"
        />
        {/* <span className={ styles.spanName } data-testid="top-title">
          {' '}
          {titulo}
        </span> */}
      </>
    ) : (
      <header className={ styles.headerContainer }>
        <div ref={ node }>
          <FocusLock disabled={ !open }>
            <Burger open={ open } setOpen={ setOpen } aria-controls={ menuId } />
            <Menu open={ open } setOpen={ setOpen } id={ menuId } />
          </FocusLock>
        </div>
        <span className={ styles.spanName } data-testid="top-title">
          {' '}
          {titulo}
        </span>
      </header>
    )
  );
}

HeaderBurguer.propTypes = {
  titulo: PropTypes.string.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
