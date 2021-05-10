import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getDetailOrders } from '../services/Api/user';

const ClientDetailOrder = () => {
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const path = history.location.pathname;
  const idPathName = path.split('/')[2];
  console.log('parametro', idPathName);
  const data = [
    {
      delivery_number: '0d4291cb-11bf-4421-9214-e6cea57a03d2',
      date: '10/05',
      quantity: '5',
      name: 'Skol Lata 250ml',
      price: '2.20',
      total_price: '48.50',
    },
    {
      delivery_number: '0d4291cb-11bf-4421-9214-e6cea57a03d2',
      date: '10/05',
      quantity: '5',
      name: 'Heineken 600ml',
      price: '7.50',
      total_price: '48.50',
    },
  ];

  // useEffect(() => {
  //   const getClientOrders = async () => {
  //     const result = await getDetailOrders(idPathName);
  //     setOrder(result);
  //     setLoading(false);
  //   };
  //   getClientOrders();
  //   // getDetailOrdersidPathNamethen((r) => { setOrder(r); });
  // }, [idPathName]);

  return (
    <div>
      <h1 data-testid="top-title">Detalhes de Pedido</h1>
      <div>
        {data.map(({ name, key, price }) => (
          <div key={ key }>
            <h5 key={ key }>{name}</h5>
            <p>{price}</p>
          </div>
        ))}
        {/* {!loading ? console.log(order) : 'carregando'} */}
      </div>
    </div>
  );
};

export default ClientDetailOrder;
