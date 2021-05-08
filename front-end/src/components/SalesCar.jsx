import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import TrybeerContext from '../context/TrybeerContext';
import Buttons from './Buttons';

export default function SalesCar({ value }) {
  const { priceCar } = useContext(TrybeerContext);
  const [redirect, setRedirect] = useState(false);
  const AUX_BOOLEAN = true;

  const handlerRedirect = () => setRedirect(true);

  if (redirect) return (<Redirect to="/salesBar" />);

  return (
    <div>
      <Buttons
        data-testid="checkout-bottom-btn"
        value="Ver Carrinho"
        disable={ priceCar <= 0 ? AUX_BOOLEAN : false }
        countClick={ handlerRedirect }
      />
      {' '}
      <span
        data-testid="checkout-bottom-btn-value"
      >
        R$
        {' '}
        { Number.parseFloat(value).toFixed(2).split('.').join(',') }
      </span>
    </div>
  );
}

SalesCar.propTypes = {
  value: PropTypes.number.isRequired,
};
