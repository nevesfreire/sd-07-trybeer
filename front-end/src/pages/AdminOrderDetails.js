import React, { useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bulma-components';
import { getOrdersById, changeStatus } from '../api';
import services from '../services';
import { Header, Loading } from '../components';

function AdminOrderDetails() {
  const [loading, setLoading] = useState(true);
  const [saleOrder, setSaleOrder] = useState();
  const [products, setProducts] = useState([]);
  const [buttonState, setButtonState] = useState(false);
  const history = useHistory();

  const handleData = (num1, num2) => {
    const result = num1 * num2;
    const newResult = result.toFixed(2).split('.').join(',');
    return newResult;
  };

  const handleClick = async () => {
    const user = await services.acessLocalStorage.getUserLocalStorage();
    const response = await changeStatus(user.token);
    setButtonState(true);
    console.log(response);
  };

  const requestOrder = useCallback(async () => {
    const user = await services.acessLocalStorage.getUserLocalStorage();
    if (!user) return history.push('/login');
    const resultApi = await getOrdersById(user.token, 1);
    setSaleOrder(resultApi.data);
    setProducts(resultApi.data.products);
    if (resultApi) setLoading(false);
  }, [history]);

  useEffect(() => {
    requestOrder();
  }, [requestOrder]);

  return (
    <div className="content is-large">
      <div>
        <Header title="TryBeer" />
      </div>
      {
        loading
          ? <Loading />
          : (
            <>
              <div>
                <span data-testid="order-number">{saleOrder.sale}</span>
                <span data-testid="order-status">{saleOrder.status}</span>
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
                          R$
                          {handleData(product.unit_price, product.quantity)}
                        </span>
                        <span data-testid={ `${index}-product-unit-price` }>
                          (R$
                          {product.unit_price.split('.').join(',')}
                          )
                        </span>
                      </div>
                    </div>
                  ))
              }
              <div data-testid="order-total-value">
                Total: R$
                {saleOrder.total_price.split('.').join(',')}
              </div>
              <Button
                disabled={ saleOrder.status === 'Entrege' || buttonState === true }
                onClick={ () => handleClick() }
              >
                Marcar pedido como entregue
              </Button>
            </>
          )
      }
    </div>
  );
}

export default AdminOrderDetails;
