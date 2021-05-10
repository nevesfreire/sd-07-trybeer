import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getDetailOrders } from '../services/Api/user';

const ClientDetailOrder = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/');
  // console.log('parametro', idPathName[2]);

  useEffect(() => {
    const getClientOrders = async () => {
      const result = await getDetailOrders(idPathName[2]);
      setOrder(result);
      setLoading(false);
    };
    getClientOrders();
    // getDetailOrdersidPathNamethen((r) => { setOrder(r); });
  }, [idPathName]);

  return (
    <div>
      <h1 data-testid="top-title">Detalhes de Pedido</h1>
      <div>
        {!loading ? console.log(order) : 'carregando'}
      </div>
    </div>
  );
};

export default ClientDetailOrder;
