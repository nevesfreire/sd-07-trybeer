import React from 'react';
import { useHistory } from 'react-router-dom';
import { getUser } from '../helpers/localStorageHelper';
import Client from '../components/Client';
import Admin from '../components/Admin';

function Home() {
  const history = useHistory();
  if (getUser() !== undefied) {
    const user = getUser();
    return user.role === 'client' ? <Client /> : <Admin />;
  }
  return history.push('/login');
}

export default Home;
