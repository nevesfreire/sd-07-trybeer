import React, { useEffect, useState, useCallback } from 'react';
import { Container, Header, Button, Table, Segment, Card } from 'semantic-ui-react';
import CustomSideBarAdmin from '../components/CustomSideBarAdmin';
import CustomAdminDetail from '../components/CustomAdminDetail';
import {
  fetchOrderDeliveryId,
  fetchOrderDetails,
  fetchAllOrders,
} from '../service/order';
import { getOrderDetails } from '../helpers/localStorage';
import './pagesStyles.css';

function AdminDetail({ match }) {
  const [adminDetail, setAdminDetail] = useState(getOrderDetails());
  const [buttonDelivery, setButtonDelivery] = useState(true);

  const { id } = match.params;

  let sumTotal = 0;
  adminDetail.map((total) => {
    sumTotal = total.total + sumTotal;
    return sumTotal;
  });

  useEffect(() => {}, []);

  const submitId = async () => {
    await fetchOrderDeliveryId(adminDetail[0].sale_id);
    await fetchOrderDetails(adminDetail[0].sale_id);
    setButtonDelivery(false);
    setAdminDetail(getOrderDetails());
    fetchAllOrders();
  };

  const renderButton = () => {
    return (
      buttonDelivery && (
        <Button
          onClick={ () => submitId() }
          positive
          data-testid="mark-as-delivered-btn"
          style={{ marginTop: 20}}
        >
          Marcar como entregue
        </Button>
      )
    )
  }

  const adminDetailHeader = useCallback(
    () => (
      <div>
        {!adminDetail ? null : (
          <Segment >
            <Card.Content>
              <span id="orderNumber" data-testid="order-number" style={{ fontSize: 24}}>
                {`Pedido ${id} - `}
              </span>

              {/* ${adminDetail[0].sale_id} */}
              
              <span positive htmlFor="orderNumber" data-testid="order-status" style={{ fontSize: 30}}>
                {`${adminDetail[0].status}`}
              </span>
            </Card.Content>

            <Header textAlign="right" data-testid="order-total-value">
              {`TOTAL - R$ ${sumTotal.toFixed(2).replace('.', ',')}`}
            </Header>
          </Segment>
        )}
      </div>
    ),
    [adminDetail, sumTotal],
  );

  const renderOrderAdminDetail = useCallback(() => (
    <div>
      <Table stackable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Quantidade</Table.HeaderCell>
              <Table.HeaderCell>Item</Table.HeaderCell>
              <Table.HeaderCell>Preço Unitário</Table.HeaderCell>
              <Table.HeaderCell textAlign="right">Total do pedido</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          {!adminDetail
            ? null
            : adminDetail.map((beer, index) => (
              <Table.Body>
                <Table.Row key={beer.id} data-testid={ `${index}-order-card-container`}>
                  <Table.Cell data-testid={ `${index}-product-qtd` }>
                    {`${beer.quantity}`}
                  </Table.Cell>
                  <Table.Cell data-testid={ `${index}-product-name` }>
                    {`${beer.name}`}
                  </Table.Cell>
                  <Table.Cell data-testid={ `${index}-order-unit-price` }>
                  {`(R$ ${(beer.total / beer.quantity)
                        .toFixed(2).toString().replace('.', ',')})`}
                  </Table.Cell>
                  <Table.Cell textAlign="right" data-testid={ `${index}-product-total-value` }>
                    {`R$ ${beer.total.toFixed(2).toString().replace('.', ',')}`}
                  </Table.Cell>
                </Table.Row>
                {/* <CustomAdminDetail index={ index } beer={ beer } /> */}
              </Table.Body>
            ))}
        </Table>
      {/* {!adminDetail
        ? null
        : adminDetail.map((beer, index) => (
          
          // <Grid.Column key={ beer.id }>
          //   <CustomAdminDetail index={ index } beer={ beer } />
          // </Grid.Column>
        ))} */}
    </div>
  ), []);

  useEffect(() => {
    adminDetailHeader();
    renderOrderAdminDetail();
  }, [adminDetailHeader, buttonDelivery, renderOrderAdminDetail]);

  return (
    <div className="container-order-details">
      <sidebar>
        <CustomSideBarAdmin />
      </sidebar>
      <Container style={{ padding: 20 }}>
        <Header as="h1" color="orange" textAlign="center">Detalhes de Pedido</Header>
        {adminDetailHeader()}
        {renderOrderAdminDetail()}
        {renderButton()}
        {/* {buttonDelivery && (
          <Button
            onClick={ () => submitId() }
            positive
            data-testid="mark-as-delivered-btn"
            style={{ marginTop: 20}}
          >
            Marcar como entregue
          </Button>
        )} */}
      </Container>
    </div>
  );
}

export default AdminDetail;
