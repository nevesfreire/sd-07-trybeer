import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import SideBar from '../../Components/SideBar';
import verifyUserLocalStorage from '../../util/changeLocalStorage';
// import PropTypes from 'prop-types';

const AdminProfile = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const role = 'administrator';
  const history = useHistory();

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    if (!data) return history.push('/login');
    setUser({ name: data.name, email: data.email });
  }, [history]);

  return (
    <div>
      <SideBar role={ role } />
      <h1>Perfil</h1>
      <p data-testid="profile-name">{`Nome: ${user.name}`}</p>
      <p data-testid="profile-email">{`Email: ${user.email}`}</p>
    </div>
  );
};

// AdminProfile.propTypes = {};

export default AdminProfile;
