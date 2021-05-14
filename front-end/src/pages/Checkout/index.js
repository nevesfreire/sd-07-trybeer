import React, { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
import CheckoutCard from '../../component/CheckoutCard';
import FormCheckout from '../../component/FormCheckout';
import TopMenu from '../../component/TopMenu';
import BeerAppContext from '../../context/BeerAppContext';
import { requestCreateSaleAPI } from '../../services';
import { getToLocalStorage } from '../../utils/localStorage';

const defaultForm = {
  street: '',
  houseNumber: '',
};

function Checkout() {
  const [formCheckout, setFormCheckout] = useState(defaultForm);
  const [messageBool, setMessageBool] = useState(false);
  const [messageValue, setMessageValue] = useState('');
  const { shopCart, totalProducts } = useContext(BeerAppContext);
  const history = useHistory();

  const validateToken = () => {
    const user = getToLocalStorage('user');
    // console.log(user);
    if (!user || !user.token) return false;
    return true;
  };

  const convertTotalPriceToNumber = (price) => {
    const NUMBER_DEFAULT = 10;
    const array = price.split(' ');
    const numberArray = array[1].split(',');
    const number = parseFloat(numberArray.join('.'), NUMBER_DEFAULT);
    return number;
  };

  const HandleRequestCreateSale = async () => {
    if (!validateToken()) {
      return history.push('/login');
    }
    const body = {
      totalProducts: convertTotalPriceToNumber(totalProducts),
      street: formCheckout.street,
      houseNumber: formCheckout.houseNumber,
      shopCart,
    };
    const sale = await requestCreateSaleAPI(body);
    const { data } = sale;
    // console.log(sale);
    if (sale.status === StatusCodes.UNAUTHORIZED) history.push('/login');
    if (sale.status === StatusCodes.CREATED) setMessageValue(data.message);
  };

  const handleMessageSucess = () => {
    const TIME = 5000;
    HandleRequestCreateSale();
    setMessageBool(true);
    setTimeout(() => history.push('/products'), TIME);
  };

  useEffect(() => {
    if (!validateToken()) {
      return history.push('/login');
    }
  }, [history]);

  return (
    <div>
      <TopMenu title="TryBeer" />
      {totalProducts === 'R$ 0,00' && <p>Não há produtos no carrinho</p>}
      {shopCart.map((product) => (
        <CheckoutCard key={ product.id } product={ product } />
      ))}
      <h2 data-testid="order-total-value">
        Total:
        {totalProducts}
      </h2>
      <FormCheckout
        formCheckout={ formCheckout }
        setFormCheckout={ setFormCheckout }
      />
      <button
        type="button"
        disabled={
          !!(totalProducts === 'R$ 0,00'
          || !formCheckout.street
          || !formCheckout.houseNumber)
        }
        data-testid="checkout-finish-btn"
        onClick={ () => handleMessageSucess() }
      >
        Finalizar Pedido
      </button>
      <p>{messageBool && messageValue}</p>
    </div>
  );
}

export default Checkout;
