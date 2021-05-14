import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import PendingOrderCard from '../components/PendingOrderCardComponent';

function PendingOrdersComponent() {
  const [loading, setLoading] = useState(true);
  const [jwtInvalid, setJwtInvalid] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);
  const [orders, setOrders] = useState([]);

  const { getOrders } = useFetch();
  const callAPI = async (userResult) => {
    const resultAPI = await getOrders(userResult.token);
    if (resultAPI.message) return setJwtInvalid(true);
    setOrders(resultAPI);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setJwtInvalid(false);
    setIsAdmin(true);
    const userResult = localStorage.getItem('user');
    if (!userResult) return setJwtInvalid(true);
    if (userResult.role !== 'administrator') return isAdmin(false);
    callAPI(userResult);    
  }, []);

  if (jwtInvalid || !isAdmin) return (<Redirect to="/login" />);
  return loading ? (
    <span>Tenha Fé...</span>
  ) : (
    <>
      <h2>Pedidos Pendentes</h2>
      {orders.map((order, index) => {
        <PendingOrderCard
          key={ order.id }
          order={ order }
          index={ index }
        />
      })}
    </>
  );
}

export default PendingOrdersComponent;
