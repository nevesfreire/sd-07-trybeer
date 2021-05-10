import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getStorage } from '../../services/localStorage';

function AdminCardOrderDetail(props) {
  const { product, index, cart } = props;
  const total = parseFloat(product.price * product.quantity).toFixed(2);
  const productPrice = parseFloat(product.price).toFixed(2);
  const history = useHistory();

  useEffect(() => {
    const user = getStorage('user');
    console.log(cart);
    if (!user) {
      history.push('/login');
    }
  }, [cart, history, props]);

  return (
    <div style={ { marginLeft: '300px' } }>
      <div data-testid={ `${index}-product-name` }>{product.name}</div>
      <div data-testid={ `${index}-product-qtd` }>{product.quantity}</div>
      <div data-testid={ `${index}-product-total-value` }>
        {`R$ ${total
          .toString()
          .replace('.', ',')}`}
      </div>
      <div data-testid={ `${index}-order-unit-price` }>
        {`(R$ ${productPrice
          .toString()
          .replace('.', ',')})` }
      </div>
    </div>
  );
}

AdminCardOrderDetail.propTypes = {
  index: PropTypes.number.isRequired,
  cart: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
  }).isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default AdminCardOrderDetail;
