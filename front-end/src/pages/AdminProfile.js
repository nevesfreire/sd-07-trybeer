import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

function AdminProfile() {
  const [user, setUser] = useState({});

  const userStorage = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  useEffect(() => {
    if (!userStorage) return history.push('/login');
    return setUser(userStorage);
  }, [history, user, userStorage]);

  const { name, email } = user;

  return (
    <>
      <h1>Perfil</h1>
      <span data-testid="profile-name">{`Nome: ${name}`}</span>
      <span data-testid="profile-email">{`Email: ${email}`}</span>
    </>
  );
}

export default AdminProfile;
