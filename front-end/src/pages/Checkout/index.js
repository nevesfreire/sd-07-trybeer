import React, { useContext, useState } from 'react';
import CheckoutCard from '../../component/CheckoutCard';
import FormCheckout from '../../component/FormCheckout';
import TopMenu from '../../component/TopMenu';
import BeerAppContext from '../../context/BeerAppContext';
import { useHistory } from 'react-router-dom';

const defaultForm = {
  street: '',
  houseNumber: '',
};

function Checkout() {
  const [formCheckout, setFormCheckout] = useState(defaultForm);
  const [messageBool, setMessageBool] = useState(false);
  const { shopCart, totalProducts } = useContext(BeerAppContext);
  const history = useHistory();

  const handleMessageSucess = () => {
    setMessageBool(true);
    setTimeout(() => history.push('/products'), 2000);
  };

  if (!shopCart || !shopCart.length) return <h1>LOADING...</h1>;

  return (
    <div>
      <TopMenu title='TryBeer' />
      {totalProducts === 'R$ 0,00' && <h1>Não há produtos no carrinho</h1>}
      {shopCart.map(product => (
        <CheckoutCard key={product.id} product={product} />
      ))}
      <h2 data-testid='order-total-value'>Total: {totalProducts}</h2>
      <FormCheckout
        formCheckout={formCheckout}
        setFormCheckout={setFormCheckout}
      />
      <button
        type='button'
        disabled={
          totalProducts === 'R$ 0,00' ||
          !formCheckout.street ||
          !formCheckout.houseNumber
            ? true
            : false
        }
        data-testid='checkout-finish-btn'
        onClick={() => handleMessageSucess()}>
        Finalizar Pedido
      </button>
      <p>{messageBool && 'Compra realizada com sucesso!'}</p>
    </div>
  );
}

export default Checkout;
