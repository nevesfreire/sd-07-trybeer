import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import SideBar from '../../Components/SideBar';
import { getSaleById, updateSale } from '../../servicesAPI/api';

const AdminOrderDetail = () => {
  const role = 'administrator';
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState([]);
  const [status, setStatus] = useState('');

  const getSalesResponse = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { data: { token } } = JSON.parse(localStorage.getItem('user'));
      const salesResponse = await getSaleById(token, id);
      setStatus(salesResponse.status);
      setSale(salesResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSalesResponse();
  }, []);

  const markAsDelivered = async () => {
    const { data: { token } } = JSON.parse(localStorage.getItem('user'));
    await updateSale(token, sale.saleID);
    setStatus('Entregue');
  };

  return (
    <div>
      <SideBar role={ role } />
      {isLoading ? <div>Carregando</div> : (
        <div>
          <h3>
            <span data-testid="order-number">{ `Pedido ${sale.saleID}` }</span>
            <span> - </span>
            <span data-testid="order-status">{ status }</span>
          </h3>
          { sale.products.map(({ price, quantity, name }, index) => {
            const total = (Math.round((Number(price) * Number(quantity)) * 100)) / 100;
            return (
              <div key={ index }>
                <span data-testid={ `${index}-product-qtd` }>{ quantity }</span>
                <span data-testid={ `${index}-product-name` }>{ name }</span>
                <span
                  data-testid={ `${index}-order-unit-price` }
                >
                  { `(R$ ${price.replace('.', ',')})` }
                </span>
                <span
                  data-testid={ `${index}-product-total-value` }
                >
                  { `R$ ${total.toFixed(2).replace('.', ',')}` }
                </span>
              </div>
            );
          })}
          <div
            data-testid="order-total-value"
          >
            { `Total: R$ ${sale.totalPrice.replace('.', ',')}` }
          </div>
          <button
            type="button"
            data-testid="mark-as-delivered-btn"
            hidden={ status === 'Entregue' }
            onClick={ () => markAsDelivered() }
          >
            Marcar como entregue
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminOrderDetail;
