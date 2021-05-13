import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getToLocalStorage } from '../../utils/localStorage';
import TopMenu from '../../component/TopMenu';

function AdminOrders() {
  const history = useHistory();

  const validateToken = () => {
    const user = getToLocalStorage('user');
    // console.log(user);
    if (!user || !user.token) return false;
    return true;
  };

  useEffect(() => {
    if (!validateToken()) {
      return history.push('/login');
    }
  }, [history]);

  return (
    <div>
      <TopMenu title="TryBeer" />
      <div>
        <h1>ADMIN  ORDERS</h1>
      </div>
    </div>
  );
}

export default AdminOrders;
