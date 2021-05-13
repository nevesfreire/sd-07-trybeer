import React, { useEffect, useState } from 'react';
import CustomAdminOrders from '../components/CustomAdminOrders';
import CustomSideBarAdmin from '../components/CustomSideBarAdmin';
import { fetchAllOrders } from '../service/order';
import { getAllOrders } from '../helpers/localStorage';
import { Grid, Segment } from 'semantic-ui-react';

function AdminOrders() {
  const [allOrders, setAllOrders] = useState(getAllOrders());

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    renderAllOrders();
  }, []);

  const renderAllOrders = () => {
    return (
      <div>
        {!allOrders
          ? null
          : allOrders.map((beer, index) => (
              <Grid.Column>
                <CustomAdminOrders key={beer.id} index={index} beer={beer} />
              </Grid.Column>
            ))}
      </div>
    );
  };
  return (
    <div className="container-order-details">
      <sidebar>
        <CustomSideBarAdmin />
      </sidebar>
      <main>
        <header>{ 'Pedidos' }</header>
        {renderAllOrders()}
      </main>
    </div>

  );
}

export default AdminOrders;
