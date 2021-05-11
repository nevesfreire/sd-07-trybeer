import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Address from '../components/Address';
import Header from '../components/Header';
import saveOrder from '../services/Order';
import { update } from '../actions';

export default function Checkout() {
  const INITIAL_VALUE = 0;
  const ROUNDING_OPTION = 2;
  const dispatch = useDispatch();

  const cartList = useSelector(({ cart }) => cart);

  const totalValue = cartList
    .map((item) => item.totalPrice)
    .reduce((acc, next) => acc + next, INITIAL_VALUE);

  const [address, setAddress] = useState({
    street: '',
    number: '',
  });

  const [disabled, setDisabled] = useState(true);

  const removeItem = (item) => {
    const filteredCart = cartList.filter((product) => product.id !== item.id);
    dispatch(update(filteredCart));
  };

  const renderBody = () => {
    return cartList.map((item, index) => (
    <div>
      <tr key={ index }>
        <td data-testid={ `${index}-product-qtd-input` }>{ item.quantity }</td>
        <td data-testid={ `${index}-product-name` }>{ item.name }</td>
        <td data-testid={ `${index}-product-unit-price` }>{ `R$ ${item.price.toFixed(ROUNDING_OPTION)}` }</td>
        <td data-testid={ `${index}-product-total-value` }>{ `R$ ${item.totalPrice.toFixed(ROUNDING_OPTION)}` }</td>
      </tr>
      <button
        type="button"
        data-testid={ `${index}-removal-button` }
        onClick={ () => removeItem(item) }
      >
        -
      </button>
    </div>));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setAddress({
      ...address, [name]: value,
    });
  };

  useEffect(() => {
    const MIN_VALUE = 0;
    const { street, number } = address;
    if (street && number && totalValue > MIN_VALUE) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [address, totalValue]);

  const handleSubmit = async () => {
    const userOrder = {
      cartList,
      totalValue,
      address,
    };
    await saveOrder(dispatch, userOrder);
  };

  return (
    <>
      <Header title="Finalizar Pedido" />
      <table>
        <thead>
          <tr>
            <th>Quantidade</th>
            <th>Nome</th>
            <th>Valor Unitário</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          { renderBody() }
        </tbody>
      </table>
      <div>
        <span>Valor total do pedido</span>
        <span data-testid="order-total-value">{ `R$ ${totalValue.toFixed(ROUNDING_OPTION)}` }</span>
      </div>
      <Address
        handleEvent={ (event) => handleChange(event) }
        status={ disabled }
        order={ () => handleSubmit() }
      />
    </>
  );
}
