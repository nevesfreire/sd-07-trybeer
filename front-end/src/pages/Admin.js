import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ComponentAdmin from '../components/Admin';
import Menu from '../components/Menu';

function Admin(props) {
  const { history } = props;
  return (
    <div className="container-register">
      <Header title="Trybeer" />
      <Menu path={ history } />
      <ComponentAdmin />
    </div>
  );
}

Admin.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Admin;
