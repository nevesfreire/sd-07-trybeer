import React from 'react';
import PropTypes from 'prop-types';
import MenuBurger from '../Menu/index';

export default function Header({ title }) {
  return (
    <div>
      <MenuBurger data-testid="top-hamburguer" />
      <h1 data-testid="top-title">
        { title }
      </h1>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};
