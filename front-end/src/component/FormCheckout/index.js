import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function FormCheckout({ formCheckout, setFormCheckout }) {
  const handleValueState = ({ target }) => {
    const { value, name } = target;
    setFormCheckout({ ...formCheckout, [name]: value });
  };

  return (
    <div className="form-checkout-container">
      <h1>Endereço</h1>
      <form>
        <label htmlFor="street">
          Rua:
          <input
            type="text"
            name="street"
            id="street"
            value={ formCheckout.street }
            data-testid="checkout-street-input"
            onChange={ (e) => handleValueState(e) }
          />
        </label>
        <label htmlFor="houseNumber">
          Número da Casa:
          <input
            type="text"
            name="houseNumber"
            id="houseNumber"
            value={ formCheckout.houseNumber }
            data-testid="checkout-house-number-input"
            onChange={ (e) => handleValueState(e) }
          />
        </label>
      </form>
    </div>
  );
}

FormCheckout.propTypes = {
  formCheckout: PropTypes.shape({
    street: PropTypes.string,
    houseNumber: PropTypes.string,
  }).isRequired,
  setFormCheckout: PropTypes.func.isRequired,
};

export default FormCheckout;
