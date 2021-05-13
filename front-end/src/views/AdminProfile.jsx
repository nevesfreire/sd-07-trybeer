import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import TopBar from '../components/menuSideBar/Menu';

export default function AdminOrders() {
  const [user, setUser] = useState({
    name: '',
    email: '',
  });

  const history = useHistory();

  useEffect(() => {
    const userData = JSON.parse(window.localStorage.getItem('user'));

    if (userData === null) return history.push('/login');

    setUser({
      name: userData.name,
      email: userData.email,
    });
  }, [history, setUser]);

  return (
    <div>
      <TopBar title="Perfil" />
      <div>
        <div data-testid="profile-name">{user.name}</div>
        <div data-testid="profile-email">{user.email}</div>
      </div>
    </div>
  );
}
