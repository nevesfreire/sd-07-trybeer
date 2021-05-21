import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import { fetchOrder } from '../actions';

export default function OrderDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const orderSelected = useSelector(({ order }) => order);
  const { totalPrice, saleDate, productList } = orderSelected.order;
  const user = JSON.parse(localStorage.getItem('user'));
  const check = moment(saleDate, 'YYYY/MM/DD').format('DD/MM');

  const [shouldRedirect, setShouldRedirect] = useState('');

  useEffect(() => {
    console.log(user);
    if (!user || orderSelected.error) {
      setShouldRedirect('/login');
    } else {
      dispatch(fetchOrder(params.id, user.token));
    }
  }, [dispatch, orderSelected.error, params.id, user]);

  return (
    <>
      <Header title="Detalhes de Pedido" />
      { shouldRedirect && <Redirect to={ shouldRedirect } /> }
      <h1 data-testid="order-number">{ `Pedido ${params.id}` }</h1>
      <span data-testid="order-date">
        { check }
      </span>
      <table>
        <thead>
          <tr>
            <th>Quantidade</th>
            <th>Nome</th>
            <th>Valor Total do Produto</th>
            <th>Valor Total do Pedido</th>
          </tr>
        </thead>
        <tbody>
          { productList && productList.map((product, index) => (
            <tr key={ index }>
              <td data-testid={ `${index}-product-qtd` }>{ product.quantity }</td>
              <td data-testid={ `${index}-product-name` }>{ product.name }</td>
              <td data-testid={ `${index}-product-total-value` }>
                { `${new Intl.NumberFormat('pt-br',
                  { style: 'currency', currency: 'BRL' }).format(product.productPrice)}` }
              </td>
            </tr>
          )) }
          <tr>
            <td data-testid="order-total-value">
              { `${new Intl.NumberFormat('pt-br',
                { style: 'currency', currency: 'BRL' }).format(totalPrice)}` }
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
