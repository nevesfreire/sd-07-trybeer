import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getStorage } from '../../services/localStorage';

function CardOrderDetail(props) {
  const { product, index } = props;
  const total = parseFloat(product.price * product.quantity).toFixed(2);
  const history = useHistory();

  useEffect(() => {
    const user = getStorage('user');
    if (!user) {
      history.push('/login');
    }
  }, [history]);

  return (
    <div>
      <div data-testid={ `${index}-product-name` }>{product.name}</div>
      <div data-testid={ `${index}-product-qtd` }>{product.quantity}</div>
      <div data-testid={ `${index}-product-total-value` }>
        {`R$ ${total
          .toString()
          .replace('.', ',')}`}

      </div>
    </div>
  );
}

CardOrderDetail.propTypes = {
  index: PropTypes.number.isRequired,
  product: PropTypes.shape({
    name: PropTypes.string,
    quantity: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
};

export default CardOrderDetail;
