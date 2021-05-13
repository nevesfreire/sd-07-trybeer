import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import TopBar from '../components/menuSideBar/Menu';
import Card from '../components/screenOdersID/CardCliente';

export default function OrdersID() {
  const { id } = useParams();
  const { push } = useHistory();
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [load, setLoad] = useState(true);
  const [response, setResponse] = useState({});

  useEffect(() => {
    if (!user) return push('/');
    const endpoint = `/sale/${id}`;
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
    };
    fetch(`http://localhost:3001${endpoint}`, requestOptions)
      .then((request) => request.json())
      .then((data) => setResponse(data));
    setLoad(true);
  }, [id, push, user]);

  return (
    <div>
      <TopBar title="Detalhes de Pedido" />
      {load ? <h4>carregando...</h4> : <Card obj={ response } />}
    </div>
  );
}
