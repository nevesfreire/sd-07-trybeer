import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

function AdminProfile() {
  const user = JSON.parse(localStorage.getItem('user'));
  const { name, email } = user;

  const history = useHistory();
  useEffect(() => {
    if (!user) return history.push('login');
  }, [history, user]);

  return (
    <>
      <h1>Perfil</h1>
      <spam data-testid="profile-name">{`Nome: ${name}`}</spam>
      <spam data-testid="profile-email">{`Email: ${email}`}</spam>
    </>
  );
}

export default AdminProfile;
