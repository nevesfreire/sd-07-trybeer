import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import useFetch from '../hooks/useFetch';

function ClientOrdersDetails({ param }) {
  const [loading, setLoading] = useState(true);
  const [orderDetails, setOrderDetails] = useState({});
  const [jwtInvalid, setJwtInvalid] = useState(false);

  const { getClientOrderDetails } = useFetch();
  const callAPI = async (token) => {
    const resultAPI = await getClientOrderDetails(token, param);
    console.log(resultAPI)
    if (resultAPI.message) return setJwtInvalid(true);
    setOrderDetails(resultAPI);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setJwtInvalid(false);
    const userResult = JSON.parse(localStorage.getItem('user'));

    callAPI(userResult.token)
  }, []);

  if (jwtInvalid) return (<Redirect to="/login" />);

  return loading ? (
    <span>Tenha Fé...</span>
  ) : (
    <section>
      <div>
        <div>
          <h1>Pedido</h1>
          <span
            data-testid="order-number"
          >
            { param }
          </span>
        </div>
        <span
          data-testid="order-date"
        >
          { orderDetails[0].sale_date }
        </span>
      </div>
      <div>
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
                data-testid={ `${index}-product-qtd` }
              >
                { String((order.price * order.quantity).toFixed(2)).replace('.', ',') }
              </span>
            </div>
          ))
        }
      </div>
      <span
        data-testid="order-total-value"
      >
        Total:
        { `R$ ${String(orderDetails.reduce((acc, cur) => {
          const totalPerProduct = cur.quantity * cur.price;
          return acc + totalPerProduct;
        }, 0).toFixed(2)).replace('.', ',')}`}
      </span>
    </section>
  );
}

export default ClientOrdersDetails;
