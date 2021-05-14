import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import jwtDecode from 'jwt-decode';
import TopMenu from '../../../commons/simple/TopMenu';
import SideBar from '../../../commons/composed/SideBar';
import {
  getOrdersDetailRequest,
  changeStatusRequest,
} from '../../../services/orderDetailsApi';

function OrderDetailsAdmin(props) {
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderDetail, setOrderDetail] = useState([]);
  const [orderStatus, setOrderStatus] = useState('');
  const [orderPrice, setOrderPrice] = useState('');

  const history = useHistory();
  const {
    match: {
      params: { id },
    },
  } = props;

  const StatusOk = 200;

  const statusHandleClick = async () => {
    const result = await changeStatusRequest(id);
    if (result.status === StatusOk) {
      setOrderStatus('Entregue');
    }
  };

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
      console.log(data);
      setOrderDetail(result.data);
      setOrderPrice(data[0].totalPrice);
      setOrderStatus(data[0].orderStatus);
    };
    renderOrderDetail();
  }, [id, setOrderPrice, setOrderDetail, setOrderStatus]);

  return (
    <>
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && role !== 'administrator' && (
        <TopMenu title="Detalhes de Pedido" />
      )}
      {!isLoading && role === 'administrator' && <SideBar isAdmin />}
      <h2 data-testid="order-number">{`Pedido ${id}`}</h2>
      <h2 data-testid="order-status">{orderStatus}</h2>
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
          <h4 data-testid={ `${index}-order-unit-price` }>
            {`(R$ ${product.unityPrice
              .toFixed(2)
              .toString()
              .replace('.', ',')})`}
          </h4>
        </div>
      ))}
      <h2 data-testid="order-total-value">
        {`Total: R$ ${orderPrice.toString().replace('.', ',')}`}
      </h2>
      {orderStatus === 'Pendente' ? (
        <button
          data-testid="mark-as-delivered-btn"
          type="button"
          onClick={ statusHandleClick }
        >
          Marcar como entregue
        </button>
      ) : null}
    </>
  );
}

OrderDetailsAdmin.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.node.isRequired,
    }),
  }).isRequired,
};

export default OrderDetailsAdmin;
