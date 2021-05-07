import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { getUser } from '../helpers/localStorageHelper';
import BeerContext from '../context/BeerContext';

function Home() {
  const { setErrorMessage } = useContext(BeerContext);
  setErrorMessage(null);
  if (getUser() !== null) {
    const user = getUser();
    if (user.role === 'client') return <Redirect to="/products" />;
    return <Redirect to="/admin/orders" />;
  }
  return <Redirect to="/login" />;
}

export default Home;
