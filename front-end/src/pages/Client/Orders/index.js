import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import TopMenu from '../../../commons/simple/TopMenu';
import SideBar from '../../../commons/composed/SideBar';
import OrdersCard from '../../../components/ordersCard';
import ordersRequest from '../../../services/ordersApi';

function Orders() {
  const OK = 200;
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [card, setCard] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const getData = async (id, saleDate, totalPrice) => {
      const response = await ordersRequest(id, saleDate, totalPrice);
      if (response.status === OK) {
        setCard(response.data);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    const getToken = () => {
      const tokenUser = localStorage.getItem('token');
      if (!tokenUser) return history.push('/login');
      const userData = jwtDecode(tokenUser);
      setRole(userData.role);
      setIsLoading(false);
    };

    getToken();
  }, [history]);

  return (
    <>
      { isLoading && <h1>Loading...</h1> }
      { !isLoading && role !== 'administrator' && <TopMenu title="Meus Pedidos" /> }
      { card.map((item, index) => (<OrdersCard
        key={ item.id }
        id={ item.id }
        saleDate={ item.saleDate }
        totalPrice={ item.totalPrice }
        index={ index }
      />))}
      { !isLoading && role === 'administrator' && <SideBar isAdmin /> }
    </>
  );
}

export default Orders;
