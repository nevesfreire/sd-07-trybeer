import React, { useEffect, useState } from 'react';
import { Button, Grid, Segment } from 'semantic-ui-react';
import CustomSideBarAdmin from '../components/CustomSideBarAdmin';
import CustomAdminDetail from '../components/CustomAdminDetail';
import { fetchOrderDeliveryId,
  fetchOrderDetails, fetchAllOrders } from '../service/order';
import { getOrderDetails } from '../helpers/localStorage';
import './pagesStyles.css';

function AdminDetail() {
  const [adminDetail, setAdminDetail] = useState(getOrderDetails());
  const [buttonDelivery, setButtonDelivery] = useState(true);

  let sumTotal = 0;
  adminDetail.map((total) => (sumTotal = total.total + sumTotal)

  // useEffect(() => {}, []);

  const submitId = async () => {
    await fetchOrderDeliveryId(adminDetail[0].sale_id);
    await fetchOrderDetails(adminDetail[0].sale_id);
    setButtonDelivery(false);
    setAdminDetail(getOrderDetails());
    fetchAllOrders();
  };

  useEffect(() => {
    adminDetailHeader();
    renderOrderAdminDetail();
  }, [adminDetailHeader, buttonDelivery, renderOrderAdminDetail]);

  const adminDetailHeader = (useCallback(() => (
    <Segment>
      <div>
        {!adminDetail ? null : (
          <div>
            <p data-testid="order-number">{`Pedido ${adminDetail[0].sale_id}`}</p>
            <label data-testid="order-status">{`${adminDetail[0].status}`}</label>
            <p data-testid="order-total-value">
              {`R$ ${sumTotal
                .toFixed(2)
                .replace('.', ',')}`}
            </p>
          </div>
        )}
      </div>
    </Segment>
  )));

  const renderOrderAdminDetail = (useCallback(() => (
    <div>
      {!adminDetail
        ? null
        : adminDetail.map((beer, index) => (
          <Grid.Column>
            <CustomAdminDetail key={ beer.id } index={ index } beer={ beer } />
          </Grid.Column>
        ))}
    </div>
  )));

  return (
    <div>
      <sidebar>
        <CustomSideBarAdmin />
      </sidebar>
      <main>
        <header>Detalhes de Pedido</header>
        {adminDetailHeader()}
        {renderOrderAdminDetail()}
        {buttonDelivery && (
          <Button
            onClick={ () => submitId() }
            color="green"
            data-testid="mark-as-delivered-btn"
          >
            "Marcar como entregue"
          </Button>
        )}
      </main>
    </div>
  );
}

export default AdminDetail;
