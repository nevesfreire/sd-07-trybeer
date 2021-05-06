import React from 'react';
import { useParams } from 'react-router';

export default function OrdersID() {
  const { id } = useParams();
  return (
    <div>
      <h1>
        Cliente-pedido
        {id}
      </h1>
    </div>
  );
}
