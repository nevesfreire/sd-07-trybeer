import React from 'react';
import { useHistory } from 'react-router';

function dinheiro(dindin) {
  const totalBR = dindin.replace('.', ',');
  return `R$ ${totalBR}`;
}

export default function Card(prop) {
  const user = JSON.parse(window.localStorage.getItem('user'));
  const { push } = useHistory();
  if (prop.obj.message) {
    const { message } = prop.obj;
    if (message.indexOf('Token') > 0) return push('/');
    return (
      <h4>{ message }</h4>
    );
  }
  const { orderDetails } = prop.obj;
  const { id, total, orderItems, orderStatus } = orderDetails;

  const entregar = async () => {
    const ok = 202;
    const endpoint = `/order/${id}`;
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        authorization: user.token,
      },
    };
    const API = await fetch(`http://localhost:3001${endpoint}`, requestOptions);
    const response = await API.json();
    if (response === ok) {
      document.location.reload();
    }
  };

  return (
    <div>
      <h4 data-testid="order-number">{`Pedido ${id}`}</h4>
      <h4 data-testid="order-status">{orderStatus}</h4>
      <div>
        {orderItems.map((item, index) => {
          const { name, price, quantity } = item;
          const totalItem = (price * quantity).toFixed(2);
          return (
            <div key={ index }>
              <h4 data-testid={ `${index}-product-qtd` }>{quantity}</h4>
              <h4 data-testid={ `${index}-product-name` }>{name}</h4>
              <h4 data-testid={ `${index}-product-total-value` }>
                {dinheiro(totalItem)}
              </h4>
              <h4 data-testid={ `${index}-order-unit-price` }>{dinheiro(price)}</h4>
            </div>
          );
        })}
        <h4 data-testid="order-total-value">{dinheiro(total)}</h4>
      </div>
      <button
        type="button"
        data-testid="mark-as-delivered-btn"
        style={ {
          visibility: ((orderStatus === 'Pendente') ? 'visible' : 'hidden'),
        } }
        onClick={ entregar }
      >
        Marcar como entregue
      </button>
    </div>
  );
}
