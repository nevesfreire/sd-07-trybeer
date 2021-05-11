import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Address({ handleEvent, status, saveOrder }) {
  const DELAY = 2000;
  const orderStatus = useSelector(({ order }) => order);
  const dispatch = useDispatch();

  const handleSuccess = () => {
    setTimeout(() => {
      return 'Compra realizada com sucesso!';
    }, DELAY);
    dispatch(update([]));
    return <Redirect to="/products" />
  };

  return (
    <>
      <form onSubmit={ () => saveOrder() }>
        <label htmlFor="street">
          Rua
          <input
            id="street"
            name="street"
            data-testid="checkout-street-input"
            type="text"
            onChange={ (event) => handleEvent(event) }
          />
        </label>
        <label htmlFor="number">
          Número da casa
          <input
            id="number"
            name="number"
            data-testid="checkout-house-number-input"
            type="number"
            onChange={ (event) => handleEvent(event) }
          />
        </label>
        <button
          type="submit"
          disabled={ status }
          data-testid="checkout-finish-btn"
        >
          Finalizar Pedido
        </button>
      </form>
      <span>{ orderStatus === 'success' ? handleSuccess() : 'Impossível finalizar a compra.' }</span>
    </>
  );
}
