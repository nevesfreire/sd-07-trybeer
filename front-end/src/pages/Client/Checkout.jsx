import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import Header from '../../components/Header';
import { BeerContext } from '../../context/BeerContext';
import { sendProducts } from '../../services/Api/products';

const Checkout = () => {
  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const { cart } = useContext(BeerContext);
  const [localCart, setLocalCart] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem('cart'));
    if (!localValue === undefined || !localValue === null) {
      return localValue;
    }
    return ({ 0: { product: { price: 0 }, quantity: 0 } });
  });

  useEffect(() => {
    setLocalCart(JSON.parse(localStorage.getItem('cart')));
    const cart1 = JSON.parse(localStorage.getItem('cart'));
    setLocalCart(Object.values(cart1)
      .filter((product) => product.quantity > 0 && product.product.id));
  }, [cart]);

  if (!localStorage.getItem('token')) {
    return (<Redirect to="/login" />);
  }

  const finalValue = Object.values(localCart).reduce((t, { quantity, product }) => {
    if (!Number.isNaN(parseFloat(product.price))) {
      console.log(`${t}isthis`, quantity, product.price);
      return t + quantity * parseFloat(product.price);
    }
    return 0;
  }, 0);

  const accPrice = (price) => parseFloat(price).toFixed(2).toString().replace('.', ',');

  const finalizarPedido = async (e) => {
    e.preventDefault();
    const closeOrder = await sendProducts(localCart);
    console.log(street.length);
    console.log(houseNumber.length);
    return closeOrder;
  };

  const disableRule = () => {
    if (street && houseNumber && finalValue) {
      return true;
    }
  };

  const deleteProduct = (productName) => {
    const storage = Object.values(localCart)
      .filter((product) => product.product.name !== productName);
    localStorage.setItem('cart', JSON.stringify(storage));
    setLocalCart(JSON.parse(localStorage.getItem('cart')));
  };

  return (
    <div>
      <Header />
      <h1 data-testid="top-title">Chekout</h1>
      { (localCart.length === 0) ? <h3>Não há produtos no carrinho</h3>
        : (
          Object.values(localCart)
            .map((product, index) => (
              <div
                key={ index }
                className="products-checkout"
              >
                <span data-testid={ (`${index}-product-qtd-input`) }>
                  {(`${product.quantity}`)}
                </span>
                <span data-testid={ (`${index}-product-name`) }>
                  {(`${product.product.name}`)}
                </span>
                <span data-testid={ (`${index}-product-total-value`) }>
                  {(`R$ ${accPrice((product.product.price) * (product.quantity))}`)}
                </span>
                <span data-testid={ (`${index}-product-unit-price`) }>
                  {(`(R$ ${accPrice(product.product.price)} un)`)}
                </span>
                <button
                  type="button"
                  onClick={ () => deleteProduct(product.product.name) }
                  data-testid={ (`${index}-removal-button`) }
                >
                  X
                </button>
              </div>
            ))
        )}
      <div>
        <span
          data-testid="order-total-value"
        >
          {`Total: R$ ${accPrice(finalValue)}`}
        </span>
      </div>
      <div>
        <label htmlFor>
          Rua
          <input
            type="text"
            value={ street }
            onChange={ ({ target: { value } }) => setStreet(value) }
            data-testid="checkout-street-input"
          />
        </label>
      </div>
      <div>
        <label htmlFor>
          Número da casa
          <input
            type="text"
            value={ houseNumber }
            onChange={ ({ target: { value } }) => setHouseNumber(value) }
            data-testid="checkout-house-number-input"
          />
        </label>
      </div>
      <div>
        <button
          disabled={ !disableRule() }
          type="submit"
          onClick={ (e) => finalizarPedido(e) }
          data-testid="checkout-finish-btn"
        >
          Finalizar Pedido
        </button>
      </div>
    </div>);
};

export default Checkout;
