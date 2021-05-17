import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getAdminSalesDetails,
  getAdminSales,
  updateSalesStatus,
} from '../../services/apiService';

export default function ClientOrderDetails() {
  const { id } = useParams();

  const [sale, setSale] = useState(null);
  const [status, setStatus] = useState(null);
  const [hiddenButton, setHiddenButton] = useState(null);

  useEffect(() => {
    const fetchSale = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      const response = await getAdminSalesDetails(currentUser.token, id)
        .then((apiResponse) => apiResponse);
      const allSalesRes = await getAdminSales(currentUser.token)
        .then((apiRes) => apiRes);
      const saleStatus = allSalesRes.find((e) => e.id === Number(id));

      setSale(response);
      setStatus(saleStatus.status);
      if (saleStatus.status === 'Entregue') {
        return setHiddenButton(true);
      }
      setHiddenButton(false);
    };

    fetchSale();
  }, [id]);

  const deliveredButton = async () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const updateSatus = await updateSalesStatus(currentUser.token, 'Entregue', id)
      .then((apiRes) => apiRes);

    if (updateSatus.message) {
      setStatus('Entregue');
      setHiddenButton(true);
    }
  };

  if (!(sale && status)) {
    return <p>Loading...</p>;
  }

  return (
    <div className="d-flex flex-column border rounded"
    style={ { marginTop: '5vh', padding: '5vh' } }>
      <div
      >
        <h1 data-testid="order-number">{`Pedido ${id}`}</h1>
        <p data-testid="order-status">{status}</p>
        { sale.map((item, index) => {
          const productTotalValue = (item.price * item.quantity).toFixed(2);

          return (
            <div key={ item.name } className="d-flex border rounded justify-content-around"
            style={{ padding: '2vh', margin: '2vh' }}>
              <p data-testid={ `${index}-product-qtd` }>{item.quantity}</p>
              <p data-testid={ `${index}-product-name` }>{item.name}</p>
              <p data-testid="0-order-unit-price">
                {`(R$ ${item.price.replace('.', ',')})`}
              </p>
              <p data-testid={ `${index}-product-total-value` }>
                {`R$ ${String(productTotalValue).replace('.', ',')}`}
              </p>
            </div>
          );
        }) }
      </div>
      <p data-testid="order-total-value" className="align-self-end">
        Total: {sale ? `R$ ${sale[0].total_price.replace('.', ',')}` : 'R$ 0,00'}
      </p>
      <button
        type="submit"
        data-testid="mark-as-delivered-btn"
        onClick={ () => deliveredButton() }
        hidden={ hiddenButton }
      >
        Marcar como entregue
      </button>
    </div>
  );
}