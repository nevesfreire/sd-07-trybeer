import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getStorage } from '../../services/localStorage';
import { Header } from '../../components';

function AdmProfile() {
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const user = getStorage('user');
    if (user && user.role === 'administrator') {
      setUserData(user);
      setIsLoading(false);
    } else {
      history.push('/login');
    }
  }, [history]);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <Header headerTitle="Admin - Perfil" />
      <form style={ { marginLeft: '200px' } }>
        <label htmlFor="name-input">
          <h6>Nome</h6>
          <p data-testid="profile-name">{userData.name}</p>
        </label>
        <label htmlFor="email-input">
          <h6>Email</h6>
          <p data-testid="profile-email">{userData.email}</p>
        </label>
      </form>
    </div>
  );
}

export default AdmProfile;
