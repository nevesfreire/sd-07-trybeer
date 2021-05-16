import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Menu from '../components/Menu';
import ComponentAdmin from '../components/Admin';

const Admin = (props) => {
  const { history } = props;
  return (
    <div className="container-register">
      <Header title="Trybeer" />
      <Menu path={ history } />
      <ComponentAdmin />
    </div>
  );
};

Admin.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Admin;
