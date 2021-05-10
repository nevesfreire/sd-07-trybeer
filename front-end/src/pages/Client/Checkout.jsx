import React, { useContext, useEffect, useState } from 'react';
import Header from '../../components/Header';
import { BeerContext } from '../../context/BeerContext';
import { sendProducts } from '../../services/Api/products'

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
    setLocalCart(JSON.parse(localStorage.getItem('cart')))
  }, [cart]);

  const value = Object.values(localCart).reduce((t, { quantity, product }) => {
    if (!Number.isNaN(parseFloat(product.price))) {
      console.log(`${t}isthis`, quantity, product.price);
      return t + quantity * parseFloat(product.price);
    }
    return 0;
  }, 0);

  const accPrice = parseFloat(value).toFixed(2).toString().replace('.', ',');


  const finalizarPedido = async (e) => {
    e.preventDefault();
    const closeOrder = await sendProducts(localCart);
    console.log(street.length)
    console.log(houseNumber.length)
    return closeOrder
  };

  const disableRule = () => {
    if (street && houseNumber && value) {
      return true
    }
  }

  const deleteProduct = (productName) => {
    let storage = Object.values(localCart)
    .filter((product) => product.quantity > 0 && product.product.id)
    .filter((product) => product.product.name !== productName)
    localStorage.setItem('cart', JSON.stringify(storage))
    setLocalCart(JSON.parse(localStorage.getItem('cart')))
  };

  return (
    <div>
      <Header />
      <h1 data-testid="top-title">Chekout</h1>
      {(
          Object.values(localCart)
          .filter((product) => product.quantity > 0 && product.product.id)
            .map((product) => (
              <div
                key={product.product.id}
                className="products-checkout"
              >
                <span data-testid={(`${product.product.id}-product-qtd-input`)}>
                  {(`${product.quantity}`)}
                </span>
                <span data-testid={(`${product.product.id}-product-name`)}>
                  {(`${product.product.name}`)}
                </span>
                <span data-testid={(`${product.product.id}-product-total-value`)}>
                  {(`${((product.product.price) * (product.quantity)).toFixed(2)}`)}
                </span>
                <span data-testid={(`${product.product.id}-product-unit-price`)}>
                  {(`${(product.product.price)}`)}
                </span>
                <button
                  type="button"
                  onClick={() => deleteProduct(product.product.name)}
                  data-testid={(`${product.product.id}-removal-button`)}
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
          {`Total: R$ ${accPrice}`}
        </span>
      </div>
      <div>
        <label htmlFor>
          Rua
        <input
            type="text"
            value={street}
            onChange={({ target: { value } }) => setStreet(value)}
            data-testid="checkout-street-input"
          />
        </label>
      </div>
      <div>
        <label htmlFor>
          Número da casa
        <input
            type="text"
            value={houseNumber}
            onChange={({ target: { value } }) => setHouseNumber(value)}
            data-testid="checkout-house-number-input"
          />
        </label>
      </div>
      <div>
        <button
          disabled={!disableRule()}
          type="submit"
          onClick={(e) => finalizarPedido(e)}
          data-testid="checkout-finish-btn"
        >
          Finalizar Pedido
      </button>
      </div>
    </div>);
};

export default Checkout;

