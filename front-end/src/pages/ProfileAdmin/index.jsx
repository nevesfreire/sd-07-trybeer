import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import HeaderAdmin from '../../components/HeaderAdmin';

export default function ProfileAdmin() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const history = useHistory();
  useEffect(() => {
    const localStorageUser = JSON.parse(localStorage.getItem('user'));
    if (localStorageUser === null) {
      history.push('/login');
    } else {
      const { name: localName, email: localEmail } = localStorageUser;
      setEmail(localEmail);
      setName(localName);
    }
  }, [history]);
  return (
    <div>
      <HeaderAdmin namePage="Admin - Perfil" />
      <main>
        <div>
          <h1>Perfil</h1>
        </div>
        <div>
          <p data-testid="profile-name">
            Nome:
            {' '}
            {name}
          </p>
          <p data-testid="profile-email">
            Email:
            {' '}
            {email}
          </p>
        </div>
      </main>
    </div>
  );
}
