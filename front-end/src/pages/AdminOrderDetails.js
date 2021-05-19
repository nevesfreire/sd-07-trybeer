import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button } from 'react-bulma-components';
import { getOrdersById, changeStatus } from '../api';
import services from '../services';
import { HeaderAdmin, Loading } from '../components';

function AdminOrderDetails() {
  const [loading, setLoading] = useState(true);
  const [saleOrder, setSaleOrder] = useState();
  const [products, setProducts] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const [stateOrder, setStateOrder] = useState();
  const history = useHistory();
  const { state } = history.location;

  const handleData = (num1, num2) => {
    const result = num1 * num2;
    const newResult = result.toFixed(2).split('.').join(',');
    return newResult;
  };

  const handleClick = async () => {
    const user = await services.acessLocalStorage.getUserLocalStorage();
    const response = await changeStatus(user.token, state);
    setButtonState(true);
    console.log(response);
    setStateOrder('Entregue');
  };

  const requestOrder = useCallback(async () => {
    const user = await services.acessLocalStorage.getUserLocalStorage();
    if (!user) return history.push('/login');
    const resultApi = await getOrdersById(user.token, state);
    setSaleOrder(resultApi.data);
    setProducts(resultApi.data.products);
    setStateOrder(resultApi.data.status);
    if (resultApi) setLoading(false);
  }, [history, state]);

  useEffect(() => {
    requestOrder();
  }, [requestOrder]);

  return (
    <div className="content is-large first-div">
      <div>
        <HeaderAdmin title="TryBeer" />
      </div>
      {
        loading
          ? <Loading />
          : (
            <>
              <div>
                <span data-testid="order-number">
                  {`Pedido ${Number(saleOrder.sale)} - `}
                </span>
                <span data-testid="order-status">{stateOrder}</span>
              </div>

              {
                products
                  .map((product, index) => (
                    <div key={ index }>
                      <span data-testid={ `${index}-product-qtd` }>
                        { product.quantity }
                      </span>
                      <span data-testid={ `${index}-product-name` }>
                        {product.product}
                      </span>
                      <span />
                      <div>
                        <span data-testid={ `${index}-product-total-value` }>
                          {`R$ ${handleData(product.unit_price, product.quantity)}`}
                        </span>
                        <span data-testid={ `${index}-order-unit-price` }>
                          {`(R$ ${product.unit_price.split('.').join(',')})`}
                        </span>
                      </div>
                    </div>
                  ))
              }
              <div data-testid="order-total-value">
                {`Total: R$ ${saleOrder.total_price.split('.').join(',')}`}
              </div>
              <Button
                data-testid="mark-as-delivered-btn"
                disabled={ saleOrder.status === 'Entregue' || buttonState === true }
                onClick={ () => handleClick() }
              >
                Marcar como entregue
              </Button>
              <div>
                <Link
                  to="/admin/orders"
                  data-testid="side-menu-item-orders"
                >
                  Meus Pedidos
                </Link>
              </div>
            </>
          )
      }
    </div>
  );
}

export default AdminOrderDetails;
