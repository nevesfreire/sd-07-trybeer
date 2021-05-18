import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import useFetch from '../hooks/useFetch';
import MainContainer from '../styled/ClientContainers.styled';

function ClientOrdersDetails({ param }) {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [jwtInvalid, setJwtInvalid] = useState(false);

  const { getOrderById } = useFetch();
  const callAPI = async (token) => {
    const resultAPI = await getOrderById(token, param);
    if (resultAPI.message) return setJwtInvalid(true);
    setOrderDetails(resultAPI);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setJwtInvalid(false);
    const userResult = JSON.parse(localStorage.getItem('user'));
    if (!userResult || !userResult.token) return setJwtInvalid(true);
    callAPI(userResult.token);
  }, []);

  if (jwtInvalid) return (<Redirect to="/login" />);

  return loading ? (
    <span>Tenha Fé...</span>
  ) : (
    <MainContainer>
      <div className="details-card">
        <div className="top-details">
          <span
            data-testid="order-number"
          >
            { `Pedido ${param}` }
          </span>
          <span
            data-testid="order-date"
          >
            { orderDetails[0].sale_date }
          </span>
        </div>
        <div className="middle-details">
          {
            orderDetails.map((order, index) => (
              <div key={ `${order.name}-${index}` }>
                <span
                  data-testid={ `${index}-product-qtd` }
                >
                  { order.quantity }
                </span>
                <span
                  data-testid={ `${index}-product-name` }
                >
                  { order.name }
                </span>
                <span
                  data-testid={ `${index}-product-total-value` }
                >
                  { `R$ ${String((order.price * order.quantity).toFixed(2))
                    .replace('.', ',')}` }
                </span>
              </div>
            ))
          }
        </div>
        <div className="bottom-details">
          <span
            data-testid="order-total-value"
          >
            Total:
            { `R$ ${String(orderDetails.reduce((acc, cur) => {
              const totalPerProduct = cur.quantity * cur.price;
              return acc + totalPerProduct;
            }, 0).toFixed(2)).replace('.', ',')}`}
          </span>
        </div>
      </div>
    </MainContainer>
  );
}

ClientOrdersDetails.propTypes = {
  param: PropTypes.number.isRequired,
};

export default ClientOrdersDetails;
