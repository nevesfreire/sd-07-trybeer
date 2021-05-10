import React from 'react';
import PropTypes from 'prop-types';
import SideBarAdmin from '../SideBarAdmin';
import './Header.css';

export default function HeaderAdmin(props) {
  const { namePage } = props;
  return (
    <header className="header" data-testid="top-title">
      <SideBarAdmin />
      { namePage }
    </header>

  );
}

HeaderAdmin.propTypes = {
  namePage: PropTypes.string.isRequired,
};
