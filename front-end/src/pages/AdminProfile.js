import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MenuTop from '../components/MenuTop';

function AdminProfile() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    // melhor forma de definir se o usuário está logado?
    if (!user) {
      history.push('/login');
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [history]);

  return (
    <div className="form-page">
      <MenuTop />
      <div data-testid="profile-name">{ name }</div>
      <div data-testid="profile-email">{ email }</div>
    </div>
  );
}

export default AdminProfile;
