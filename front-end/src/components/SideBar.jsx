import React from 'react';
import PropTypes from 'prop-types';

export default function SideBar({ title }) {
  return (
    <header>
      <h5>menu hamburguer</h5>
      <h1>{title}</h1>
    </header>
  );
}

SideBar.propTypes = {
  title: PropTypes.string.isRequired,
};
