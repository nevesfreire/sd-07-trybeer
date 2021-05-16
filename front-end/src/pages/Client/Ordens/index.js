import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import SideBar from '../../components/Header';
import CardOrder from './CardOrder';
import { TrybeerContext } from '../../../util';
import { fetchGetOrders } from '../../../requests';

const Ordens = (props) => {
  const { orders, setOrders } = useContext(TrybeerContext);

  const userLogged = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { history } = props;

    if (!user) {
      return history.push('/login');
    }
  };

  const getOrders = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const { email } = user || '';
    console.log('ORDERS user: ', user);
    const listOrders = await fetchGetOrders(email);
    setOrders(listOrders);
  };

  useEffect(() => {
    userLogged();
    getOrders();
  }, []);

  return (
    <div>
      <SideBar title="Meus Pedidos" />
      {orders
        .map(
          (order, index) => (
            <CardOrder order={ order } key={ index } { ...props } index={ index } />),
        ) }
    </div>
  );
};

Ordens.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ordens;
