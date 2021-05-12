import React from 'react';

function FormCheckout({ formCheckout, setFormCheckout }) {

  const handleValueState = ({ target }) => {
    const { value, name } = target;
    setFormCheckout({ ...formCheckout, [name]: value });
  };

  return (
    <div>
      <h1>Endereço</h1>
      <form>
        <label htmlFor='street'>
          Rua:
          <input
            type='text'
            name='street'
            id='street'
            value={formCheckout.street}
            data-testid="checkout-street-input"
            onChange={(e) => handleValueState(e)}
          />
        </label>
        <label htmlFor='houseNumber'>
          Número da Casa:
          <input
            type='text'
            name='houseNumber'
            id='houseNumber'
            value={formCheckout.houseNumber}
            data-testid="checkout-house-number-input"
            onChange={(e) => handleValueState(e)}
          />
        </label>
      </form>
    </div>
  );
}

export default FormCheckout;
