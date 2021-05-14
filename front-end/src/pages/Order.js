import React from 'react';

import CustomHeader from '../components/CustomHeader';
import CustomRenderOrderById from '../components/CustomRenderOrderById';

function Order() {
  return (
    <div>

      <CustomHeader message="Meus Pedidos" />
      <CustomRenderOrderById />
    </div>
  );
}

export default Order;
