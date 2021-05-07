import React from 'react';
import SideBar from '../SideBar';

export default function Header() {
  return (
    <header className="header" data-testid="top-title">
      <SideBar className="side-menu-container" />
    </header>

  );
}
