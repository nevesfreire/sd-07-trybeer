import React, { useRef, useState } from 'react';
import FocusLock from 'react-focus-lock';
import Burger from './Burger';
import Menu from './Menu';
import { useOnClickOutside } from '../hooks/useClick'
import styles from '../styled/HeaderBurger.module.css';

export default function HeaderBurguer({ titulo }) {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = "main-menu";

  useOnClickOutside(node, () => setOpen(false));

  return (
    <header  className={ styles.headerContainer }> 
    <div ref={node}>
      <FocusLock disabled={!open}>
        <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
        <Menu open={open} setOpen={setOpen} id={menuId} />
      </FocusLock>
    </div>
      <span className={ styles.spanName }> {titulo}</span>
    </header>
  );
}

//onde vc chamar tem que passar a props
{/* <HeaderBurguer titulo={"Trybeer"}/> */}