import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUserSaleDetails } from '../../services/apiService';

export default function ClientOrderDetails() {
  const { id } = useParams();

  const [sale, setSale] = useState(null);
  // const [totalValue, setTotalValue] = useState(0 || sale[0].total_price)

  console.log(sale);

  useEffect(() => {
    const fetchSale = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) return null;
      const response = await getUserSaleDetails(currentUser.token, id)
        .then((apiResponse) => apiResponse);
      setSale(response);
    };
    fetchSale();
  }, [id]);

  // O título do top 'Detalhes de Pedido' deverá conter a tag data-testid="top-title"
  // O número do pedido deverá conter a tag data-testid="order-number"
  // A data do pedido deverá conter a tag data-testid="order-date"
  // A quantidade do produto deverá conter a tag data-testid="0-product-qtd"
  // O nome do produto deverá conter a tag data-testid="0-product-name"
  // O valor total do produto deverá conter a tag data-testid="0-product-total-value"
  // O valor total da compra deverá conter a tag data-testid="order-total-value"

  // https://stackoverflow.com/questions/25159330/convert-an-iso-date-to-the-date-format-yyyy-mm-dd-in-javascript
  const dateFormate = (date) => {
    date = new Date(date);
    const DAY_PARAM = 9;
    const monthd = date.getMonth() + 1;
    const day = date.getDate() <= DAY_PARAM ? `0${date.getDate()}` : date.getDate();
    const month = monthd <= DAY_PARAM ? `0${monthd}` : monthd + 1;
    return `${day}/${month}`;
  };

  return (
    <div style={ { display: 'flex', justifyContent: 'center' } }>
      <h2>Informações de Detalhes</h2>
      <div>
        <p data-testid="order-number">{id}</p>
        <p data-testid="order-date">
          {sale ? dateFormate(sale[0].sale_date) : null }
        </p>
        { sale ? sale.map((item, index) => {
        // totalValue = item.total_price;
          const productTotalValue = item.price * item.quantity;

          return (
            <div key={ item.name }>
              <p data-testid={ `${index}-product-qtd` }>{item.quantity}</p>
              <p data-testid={ `${index}-product-name` }>{item.name}</p>
              <p data-testid={ `${index}-total-value` }>{productTotalValue}</p>
              <p data-testid={ `${index}-product-name` }>{item.name}</p>
            </div>
          );
        }) : null }
      </div>
      <p data-testid="order-total-value">{sale ? sale[0].total_price : 0}</p>
    </div>
  );
}
