import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import Header from '../Header';
import ListItem from '../ListItem';
import { clearStorage } from '../../services/localStorage';
import { Creators } from '../../store/ducks/reducers/clientInfo';
import format from '../../util/format';
import styles from './styles.module.scss';

function Checkout({ products }) {
  const totalPrice = useSelector((state) => state.client.totalPrice);
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const timeToRedirect = 2000;
    if (showMessage) {
      clearStorage('cart');
      dispatch(Creators.checkout());
      setTimeout(() => {
        history.push('/products');
      }, timeToRedirect);
    }
  }, [showMessage, history, dispatch]);

  if (showMessage) return <h1>Compra realizada com sucesso!</h1>;

  return (
    <div className={ styles.main }>
      <Header />
      <div className={ styles.container }>
        <table>
          <thead>
            <tr>
              <th />
              <th>PRODUTO</th>
              <th>QTD</th>
              <th>SUBTOTAL</th>
              <th />
            </tr>
          </thead>
          { products.map((product) => <ListItem key={ product.id } product={ product } />)}
        </table>
        <form>
          <div>
            <label htmlFor="adress-input">
              <h4>Rua</h4>
              <input
                type="text"
                id="adress-input"
                onChange={ (e) => setStreet(e.target.value) }
                value={ street }
              />
            </label>
            <label htmlFor="number-input">
              <h4>Número</h4>
              <input
                type="text"
                id="number-input"
                onChange={ (e) => setHouseNumber(e.target.value) }
                value={ houseNumber }
              />
            </label>
          </div>
        </form>
        <footer>
          <button
            type="button"
            onClick={ () => setShowMessage(true) }
            disabled={ !totalPrice || !street || !houseNumber }
          >
            Finalizar pedido
          </button>
          <div className={ styles.total }>
            <span>TOTAL</span>
            <strong>{format(totalPrice)}</strong>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Checkout;

Checkout.propTypes = {
  products: PropTypes.objectOf(PropTypes.string).isRequired,
};
