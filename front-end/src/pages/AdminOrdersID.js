import React from 'react';
import { useParams } from 'react-router';

export default function AdminOrdersID() {
  const { id } = useParams;
  return (
    <div>
      <h1>
        Admin-pedido
        {id}
      </h1>
    </div>
  );
}
