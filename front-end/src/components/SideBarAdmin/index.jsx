import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../global';
import theme from '../../theme';
import MenuAdmin from '../MenuAdmin';

export default function SideBarAdmin() {
  return (
    <ThemeProvider theme={ theme }>
      <>
        <GlobalStyles />
        <MenuAdmin />
      </>
    </ThemeProvider>
  );
}
