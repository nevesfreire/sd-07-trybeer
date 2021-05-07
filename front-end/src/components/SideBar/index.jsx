import React, { useState, useRef } from 'react';
import { ThemeProvider } from 'styled-components';
import FocusLock from 'react-focus-lock';
import useOnClickOutside from '../../context/hooks/hooks';
import Menu from '../Menu';
import Burger from '../Burger';
import GlobalStyles from '../../global';
import theme from '../../theme';

export default function SideBar() {
  const [open, setOpen] = useState(false);
  const node = useRef();
  const menuId = 'main-menu';

  useOnClickOutside(node, () => setOpen(false));
  return (
    <ThemeProvider theme={ theme }>
      <>
        <GlobalStyles />
        <div ref={ node }>
          <FocusLock disabled={ !open }>
            <Burger open={ open } setOpen={ setOpen } aria-controls={ menuId } />
            <Menu open={ open } setOpen={ setOpen } id={ menuId } />
          </FocusLock>
        </div>
      </>
    </ThemeProvider>
  );
}
