import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import TopBar from '../../Components/TopBar';
import { getSaleById } from '../../servicesAPI/api';

const ClientOrderDetail = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState({});

  const getSaleResponse = async () => {
    if (JSON.parse(localStorage.getItem('user'))) {
      const { data: { token } } = JSON.parse(localStorage.getItem('user'));
      const salesResponse = await getSaleById(token, id);
      setSale(salesResponse);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSaleResponse();
  }, []);

  return (
    <div>
      <TopBar />
      {isLoading ? <div>Carregando</div> : (
        <div>
          <h1 data-testid="order-number">{ `Pedido ${sale.saleID}` }</h1>
          <div data-testid="order-date">{ sale.saleDate }</div>
          { sale.products.map(({ price, quantity, name }, index) => {
            const total = (Math.round((Number(price) * Number(quantity)) * 100)) / 100;
            return (
              <div key={ index }>
                <span data-testid={ `${index}-product-qtd` }>{ quantity }</span>
                <span data-testid={ `${index}-product-name` }>{ name }</span>
                <span>{ `R$ ${price.replace('.', ',')}` }</span>
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
        </div>
      )}
    </div>
  );
};

export default ClientOrderDetail;
