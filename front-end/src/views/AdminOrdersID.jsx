import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import SideBarAdmin from '../components/sideBarAdmin';
import Menu from './style/AdminOrders';
import Card from '../components/screenOdersID/CardAdmin';

export default function AdminOrdersID() {
  const { id } = useParams();
  const { push } = useHistory();
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [load, setLoad] = useState(true);
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (!user) return push('/');
    const endpoint = `/order/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
    };
    fetch(`http://localhost:3001${endpoint}`, requestOptions)
      .then((request) => request.json())
      .then((data) => setResponse(data))
      .then(() => setLoad(false));
  }, [id, push, user]);

  return (
    <div>
      <Menu>
        <SideBarAdmin />
        {load ? <h4>carregando...</h4> : <Card obj={ response } />}
      </Menu>
    </div>
  );
}
