import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';
import OrderCard from '../../components/OrderCard';

function Orders() {
  const [orders, setOrders] = useState([]);
  const { sideIsActive } = useContext(MyContext);
  const history = useHistory();
  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
    };
    getUser();
  }, [history]);

  // useEffect(() => {
  //   setPageTitle('Meu pedidos');
  // }, [setPageTitle]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch('http://localhost:3001/orders', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
        },
      });
      const ordersList = await response.json();
      setOrders(ordersList);
    };
    fetchOrders();
  }, []);
  return (
    <div>
      <h1 data-testid="top-title">Meus Pedidos</h1>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      {orders.map((order, index) => (<OrderCard
        key={ index }
        order={ order }
        index={ index }
      />))}

    </div>
  );
}

export default Orders;
