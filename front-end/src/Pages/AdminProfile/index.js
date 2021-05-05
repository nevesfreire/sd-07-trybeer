import React from 'react';
import SideBar from '../../Components/SideBar';
// import PropTypes from 'prop-types';

const AdminProfile = () => {
  const role = 'administrator';
  return (
    <div>
      <SideBar role={ role } />
      TELA DE PERFIL DO ADMINISTRADOR
    </div>
  );
};

// AdminProfile.propTypes = {};

export default AdminProfile;
