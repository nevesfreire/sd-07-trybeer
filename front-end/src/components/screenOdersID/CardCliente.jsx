import React from 'react';
import { useHistory } from 'react-router';

function data(date) {
  const inicioMes = 5;
  const finalMes = 7;
  const inicioDia = 8;
  const finalDia = 10;
  const mes = date.slice(inicioMes, finalMes);
  const dia = date.slice(inicioDia, finalDia);
  return `${dia}/${mes}`;
}

function dinheiro(dindin) {
  const totalBR = dindin.replace('.', ',');
  return `R$ ${totalBR}`;
}

export default function Card(prop) {
  const { push } = useHistory();
  const { statusCode } = prop.obj;
  const codeValid = 200;
  if (statusCode !== codeValid) {
    const { message } = prop.obj;
    if (message.indexOf('Token') > 0) return push('/');
    return (
      <h4>{ message }</h4>
    );
  }
  const { saleDetails } = prop.obj;
  const { id, saleDate, total, saleItems } = saleDetails;
  return (
    <div>
      <h4 data-testid="order-number">{`Pedido ${id}`}</h4>
      <h4 data-testid="order-date">{data(saleDate)}</h4>
      {saleItems.map((item, index) => {
        const { name, price, quantity } = item;
        const totalItem = (price * quantity).toFixed(2);
        return (
          <div key={ index }>
            <h4 data-testid={ `${index}-product-qtd` }>{quantity}</h4>
            <h4 data-testid={ `${index}-product-name` }>{name}</h4>
            <h4 data-testid={ `${index}-product-total-value` }>{dinheiro(totalItem)}</h4>
          </div>
        );
      })}
      <h4 data-testid="order-total-value">{dinheiro(total)}</h4>
    </div>
  );
}
