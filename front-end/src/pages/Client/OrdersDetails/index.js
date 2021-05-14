import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import PropTypes from 'prop-types';

import jwtDecode from 'jwt-decode';
import TopMenu from '../../../commons/simple/TopMenu';
import SideBar from '../../../commons/composed/SideBar';
import { getOrdersDetailRequest } from '../../../services/orderDetailsApi';

function OrderDetailClient(props) {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderDate, setOrderDate] = useState([]);
  const [orderPrice, setOrderPrice] = useState([]);

  const history = useHistory();
  const {
    match: {
      params: { id },
    },
  } = props;

  useEffect(() => {
    const getToken = () => {
      const tokenUser = localStorage.getItem('token');
      if (!tokenUser) return history.push('/login');
      const userData = jwtDecode(tokenUser);
      setRole(userData.role);
    };
    setIsLoading(false);
    getToken();
  }, [history]);

  useEffect(() => {
    const renderOrderDetail = async () => {
      const result = await getOrdersDetailRequest(id);
      const { data } = result;
      console.log(data)
      setOrderDetail(result.data);
      setOrderDate(data[0].orderDate);
      setOrderPrice(data[0].totalPrice);
    };
    renderOrderDetail();
  }, [id, setOrderPrice, setOrderDetail, setOrderDate]);

  const formatDate = (date) => moment(date).format('DD/MM');

  return (
    <div>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && role !== 'administrator' && (
        <TopMenu title="Detalhes de Pedido" />
      )}
      {!isLoading && role === 'administrator' && <SideBar isAdmin />}
      <h2 data-testid="order-number">{`Pedido ${id}`}</h2>
      <h2 data-testid="order-date">{formatDate(orderDate)}</h2>
      {orderDetail.map((product, index) => (
        <div key={ product.productName }>
          <h3 data-testid={ `${index}-product-qtd` }>
            {product.productQuantity}
          </h3>
          <h3 data-testid={ `${index}-product-name` }>{product.productName}</h3>
          <h3 data-testid={ `${index}-product-total-value` }>
            {`R$ ${product.totalProductPrice
              .toFixed(2)
              .toString()
              .replace('.', ',')}`}
          </h3>
        </div>
      ))}
      <h2 data-testid="order-total-value">
        {`Total: R$ ${orderPrice
          .toString()
          .replace('.', ',')}`}
      </h2>
    </div>
  );
}

OrderDetailClient.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};

export default OrderDetailClient;
