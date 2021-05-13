import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import TopMenu from '../../component/TopMenu';
import { getToLocalStorage } from '../../utils/localStorage';

const userDefault = {
  name: '',
  email: '',
};

function AdminProfile() {
  const [userInfo, setUserInfo] = useState(userDefault);
  const history = useHistory();

  const validateToken = () => {
    const user = getToLocalStorage('user');
    // console.log(user);
    if (!user || !user.token) return false;
    return true;
  };

  const getLocalStorageUser = () => {
    const user = getToLocalStorage('user');
    const { name, email } = user;
    setUserInfo({ ...userInfo, name, email });
  };

  // useEffect(() => {
  //   if (!validateToken()) return history.push('/login');
  //   getLocalStorageUser();
  // }, []);

  return (
    <div>
      <TopMenu title="TryBeer" />
      <div>
        <h1>Perfil</h1>
        <h3 data-testid="profile-name">{`Nome: ${userInfo.name}`}</h3>
        <h3 data-testid="profile-email">{`Email: ${userInfo.email}`}</h3>
      </div>
    </div>
  );
}

export default AdminProfile;
