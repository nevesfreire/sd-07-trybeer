import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { getStorage, setStorage } from '../../services/localStorage';
import { Creators } from '../../store/ducks/reducers/clientInfo';
import { format } from '../../util';

function ListItem({ product: { name, price, id, quantity, image } }) {
  const { updateCart } = Creators;

  const dispatch = useDispatch();

  const removeFromCart = useCallback(() => {
    const cart = getStorage('cart');
    const newCart = cart.filter((element) => element.id !== id);
    dispatch(updateCart(newCart));
    setStorage('cart', newCart);
  }, [dispatch, updateCart, id]);

  if (!quantity) return null;

  return (
    <tbody>
      <tr>
        <td>
          <img src={ image } alt={ `Imagem de ${name}` } />
        </td>
        <td>
          <strong>{name}</strong>
          <span>{format(price)}</span>
        </td>
        <td>
          <div>
            <input type="number" readOnly value={ quantity } />
          </div>
        </td>
        <td>
          <strong>{format(price * quantity)}</strong>
        </td>
        <td>
          <div>
            <button type="button" onClick={ removeFromCart }>Deletar</button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default ListItem;

ListItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    url_image: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};
