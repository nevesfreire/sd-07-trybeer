import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';

import { AdminSidebar } from '../../components';
import { getItem } from '../../services/localStorage';

import './styles.css';

function ProfileAdmin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  useEffect(() => {
    const user = getItem('user');
    if (!user) history.push('/login');
    setUsername(user.name);
    setEmail(user.email);
  }, [history]);

  return (
    <div className="admin-home-container">
      <AdminSidebar />
      <form className="form-wrapper">
        <div className="form-container">
          <h1>Perfil</h1>
          <label htmlFor="name">
            Name:
            <textarea
              id="name"
              readOnly
              data-testid="profile-name"
              value={ username }
            />
          </label>
          <label htmlFor="email">
            Email:
            <textarea
              id="email"
              readOnly
              data-testid="profile-email"
              value={ email }
            />
          </label>
        </div>
      </form>
    </div>
  );
}

export default ProfileAdmin;
