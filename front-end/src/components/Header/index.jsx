import React from 'react';
import PropTypes from 'prop-types';
import SideBar from '../SideBar';
import './Header.css';

export default function Header(props) {
  const { namePage } = props;
  return (
    <header className="header" data-testid="top-title">
      <SideBar />
      <h1>{ namePage }</h1>

    </header>

  );
}

Header.propTypes = {
  namePage: PropTypes.string.isRequired,
};
