import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function OrderDetails() {
  const { sideIsActive, setPageTitle } = useContext(MyContext);
  // const { orderObj } = OrderDetail;
  // const { id, index, orderDate, totalPrice } = orderObj;
  // console.log(id);

  const history = useHistory();
  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
    };
    getUser();
  }, [history]);

  useEffect(() => {
    setPageTitle('Detalhes de Pedido');
  }, [setPageTitle]);

  // useEffect(() => {
  //   const fetchOrdersDetails = async () => {
  //     const response = await fetch('http://localhost:3001/orders/?id=1', {
  //       method: 'GET',
  //       headers: {
  //         'Content-type': 'application/json',
  //       },
  //     });
  //     const orderDetailsList = await response.json();
  //     console.log(orderDetailsList);
  //     setOrdersDetails(orderDetailsList);
  //   };
  //   fetchOrdersDetails();
  // }, [order.id]);
  return (
    <div>
      <MenuTopMobile />
      {/* <div data-testid={ `${index}-order-number` }>{`Pedido ${id}`}</div>
      <div
        data-testid="order-total-value"
      >
        {` Total : R$ ${totalPrice}`}
      </div>
      <div data-testid={ `${index}-order-date` }>{` ${orderDate}`}</div> */}
      { sideIsActive && <SideBarMobile /> }
    </div>
  );
}
OrderDetails.propTypes = {
  orderObj: PropTypes.shape({
    id: PropTypes.number,
    orderDate: PropTypes.string,
    totalPrice: PropTypes.string,
    index: PropTypes.number,
  }).isRequired,
};

export default OrderDetails;
