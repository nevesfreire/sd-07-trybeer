import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { getAdminSalesDetails } from '../../services/apiService';
import { getUserSaleDetails } from '../../services/apiService';

export default function ClientOrderDetails() {
  const { id } = useParams();

  const [sale, setSale] = useState(null);
  // const [totalValue, setTotalValue] = useState(0 || sale[0].total_price)

  // console.log(sale);

  // O numero do pedido deverá conter a seguinte classe data-testid="order-number"
  // O status do pedido deverá conter a seguinte classe data-testid="order-status"
  // A quantidade do produto deverá conter a seguinte classe data-testid="0-product-qtd"
  // O nome do produto deverá conter a seguinte classe data-testid="0-product-name"
  // O valor total do produto deverá conter a seguinte classe data-testid="0-product-total-value"
  // O preço unitário do produto deverá conter a seguinte classe data-testid="0-order-unit-price"
  // O valor total do pedido deverá conter a seguinte classe data-testid="order-total-value"
  // O botão 'Marcar como entregue' deverá conter a seguinte classe data-testid="mark-as-delivered-btn"

  useEffect(() => {
    const fetchSale = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      // const response = await getAdminSalesDetails(currentUser.token, id)
      const response = await getUserSaleDetails(currentUser.token, id)
        .then((apiResponse) => apiResponse);
      console.log(response);
      setSale(response);
    };
    fetchSale();
  }, [id]);

  console.log(sale);
  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      <h2>Detalhes Admin</h2>
      <div>
        <p data-testid="order-number">{`Pedido ${id}`}</p>
        <p data-testid="order-date">
          {/* {status} */}
        </p>
        { sale ? sale.map((item, index) => {
        // totalValue = item.total_price;
          const productTotalValue = (item.price * item.quantity).toFixed(2);

          return (
            <div key={ item.name }>
              <p data-testid={ `${index}-product-qtd` }>{item.quantity}</p>
              <p data-testid={ `${index}-product-name` }>{item.name}</p>
              <p data-testid={ `${index}-product-total-value` }>
                {`R$ ${String(productTotalValue).replace('.', ',')}`}
              </p>
            </div>
          );
        }) : null }
      </div>
      <p data-testid="order-total-value">
        {sale ? `R$ ${sale[0].total_price.replace('.', ',')}` : 'R$ 0,00'}
      </p>
    </div>
  );
}
