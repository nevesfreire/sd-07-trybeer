import React, { useEffect, useState } from 'react';
import { Grid } from 'semantic-ui-react';
import CustomAdminOrders from '../components/CustomAdminOrders';
import CustomSideBarAdmin from '../components/CustomSideBarAdmin';
import { fetchAllOrders } from '../service/order';
import { getAllOrders } from '../helpers/localStorage';

function AdminOrders() {
  const [allOrders] = useState(getAllOrders());

  useEffect(() => {
    fetchAllOrders();
  }, []);

  useEffect(() => {
    const renderAllOrders = () => (
      <div>
        {!allOrders
          ? null
          : allOrders.map((beer, index) => (
            <Grid.Column key={ beer.id }>
              <CustomAdminOrders index={ index } beer={ beer } />
            </Grid.Column>
          ))}
      </div>
    );
    return (
      <div className="container-order-details">
        <sidebar>
          <CustomSideBarAdmin />
        </sidebar>
        <main>
          <header>Pedidos</header>
          {renderAllOrders()}
        </main>
      </div>
    );
  }, [allOrders]);
}
renderAllOrders();

export default AdminOrders;
