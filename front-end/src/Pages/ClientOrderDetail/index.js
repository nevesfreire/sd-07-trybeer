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
      console.log(salesResponse);
      setSale(salesResponse);
      setIsLoading(false);
    };
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
          { sale.products.map((product, index) => {
            const total = (Math.round((Number(product.price) * Number(product.quantity)) * 100)) / 100;
            return (
              <div key={ index }>
                <span data-testid={ `${index}-product-qtd` }>{ product.quantity }</span>
                <span data-testid={ `${index}-product-name` }>{ product.name }</span>
                <span>{ `R$ ${product.price.replace('.', ',')}` }</span>
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
