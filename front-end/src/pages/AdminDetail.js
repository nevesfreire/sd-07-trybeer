import React, { useEffect, useState } from 'react';
import CustomSideBarAdmin from '../components/CustomSideBarAdmin';
import CustomAdminDetail from '../components/CustomAdminDetail';
import { fetchOrderDetails } from '../service/order';
import { getOrderDetails } from '../helpers/localStorage';
import { Grid, Segment } from 'semantic-ui-react';
import './pagesStyles.css';

function AdminDetail() {

const [adminDetail, _setAdminDetail] = useState(getOrderDetails())
console.log(adminDetail)
let sumTotal = 0
adminDetail.map((total) =>  (
  sumTotal =total.total + sumTotal))
useEffect(() => {
}, [])

useEffect(() => {
    adminDetailHeader();
    renderOrderAdminDetail();
 }, [])

const adminDetailHeader = () => {
    return(
      <Segment>
        <div>
            {!adminDetail ? (null): (
                <div>
                    <p data-testid="order-number">{`Pedido ${adminDetail[0].sale_id}`}</p>
                    <span data-testid="order-status">{`${adminDetail[0].status}`}</span>
                    <p data-testid="order-total-value">{`R$ ${sumTotal.toFixed(2).replace('.', ',')}`}</p>
                </div>
            )}
        </div>
        </Segment>
    )
}


const renderOrderAdminDetail = () => {
    return(
<div>
{ !adminDetail? (
    null
  ) : (
    adminDetail.map((beer, index) => (
      <Grid.Column>
        <CustomAdminDetail
          key={beer.id}
          index={index}
          beer={beer}
        />
      </Grid.Column>
  )))}
    </div>
    )
}

  return (
    <div>
      <sidebar>
      <CustomSideBarAdmin />
      </sidebar>
      <main>
      <header>{'Detalhes de Pedido' }</header>
      {adminDetailHeader()}
      {renderOrderAdminDetail()}
      <button data-testid="mark-as-delivered-btn">"Marcar pedido como entregue"</button>
      </main>
    </div>
  );
}

export default AdminDetail;
