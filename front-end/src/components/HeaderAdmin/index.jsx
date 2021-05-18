import React from 'react';
import PropTypes from 'prop-types';
import SideBarAdmin from '../SideBarAdmin';
import './HeaderAdmin.css';

export default function HeaderAdmin(props) {
  const { namePage } = props;
  return (
    <header className="header" data-testid="top-title">
      <SideBarAdmin />
      <h1>{ namePage }</h1>
    </header>

  );
}

HeaderAdmin.propTypes = {
  namePage: PropTypes.string.isRequired,
};
