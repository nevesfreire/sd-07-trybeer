import React, { useState, useEffect } from "react";
import Header from '../../Components/Header';
import { Redirect } from "react-router-dom";

function Orders() {
  const [sales, setSales] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  console.log(user);

  function dataFormat(data) {
    return `${data.split("T")[0].split("-")[2]}/${
      data.split("T")[0].split("-")[1]
    }`;
  }

  useEffect(() => {
    if (user) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", user.token);
      
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };
      
      fetch("http://localhost:3001/sales", requestOptions)
        .then((response) => response.json())
        .then((sales) => setSales(sales))
        // .catch(error => console.log('error', error));
    }
  }, []);

  if (localStorage.getItem("user") === null) {
    return <Redirect to="/login" />;
  }
  
  return (
    
    <div>
      <h1>Aqui é pedido</h1>
      <Header />
      <div data-testid="top-title">Meus Pedidos</div>
      <hr></hr>
      {sales !== null && (
        <div data-testid="0-order-card-container">
          {sales.map((order, index) => (
            <div key={index}>
              <a href={`orders/${order.id}`}>
                <span data-testid={`${index}-order-number`}>Pedido {order.id}</span> -
                <span data-testid={`${index}-order-date`}>
                  {dataFormat(order.sale_date)}
                </span>{" "}
                -{" "}
                <span data-testid={`${index}-order-total-value`}>
                  R$ {order.total_price.replaceAll('.', ',')}
                </span>
                <hr></hr>
              </a>
            </div>
          )
        )
      }
      </div>
    )}
  </div>
  );
}

export default Orders;
