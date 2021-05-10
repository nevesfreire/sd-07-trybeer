import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router';
import TopBar from '../../Components/TopBar';
// import { getSaleById } from '../../servicesAPI/api';

const ClientOrderDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [sale, setSale] = useState({});

  const obj = {
    saleDate: '26/04',
    totalPrice: 10.00,
    saleID: 1,
    products: [
      {
        quantity: 9,
        name: 'Main group 18',
        price: 3.49,
      },
      {
        quantity: 3,
        name: 'Main group 17',
        price: 1.4,
      },
      {
        quantity: 7,
        name: 'Main group 10',
        price: 1.99,
      },
    ],
    status: 'Pendente',
  };

  // useEffect(() => {
  //   if (JSON.parse(localStorage.getItem('user'))) {
  //     const { data: { token } } = JSON.parse(localStorage.getItem('user'));
  //     const { id } = useParams();
  //     const salesResponse = await getSaleById(token, id);
  //     setSale(salesResponse);
  //     setIsLoading(false);
  //   }
  // }, []);

  useEffect(() => {
    setSale(obj);
    setIsLoading(false);
  }, [obj]);

  return (
    <div>
      <TopBar />
      {isLoading ? <div>Carregando</div> : (
        <div>
          <h3 data-testid="order-number">{ `Pedido ${sale.saleID}` }</h3>
          <div data-testid="order-date">{ sale.saleDate }</div>
          { sale.products.map((product, index) => {
            const total = (Math.round((product.price * product.quantity) * 100)) / 100;
            return (
              <div key={ index }>
                <span data-testid={ `${index}-product-qtd` }>{ product.quantity }</span>
                <span data-testid={ `${index}-product-name` }>{ product.name }</span>
                <span>{ `R$ ${product.price.toFixed(2).replace('.', ',')}` }</span>
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
            { `Total: R$ ${sale.totalPrice.toFixed(2).replace('.', ',')}` }
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientOrderDetail;
