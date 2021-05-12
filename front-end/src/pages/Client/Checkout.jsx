import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router';
import Header from '../../components/Header';
import { BeerContext } from '../../context/BeerContext';
import { sendProducts } from '../../services/Api/products';

const Checkout = () => {
  const { push } = useHistory();
  const { cart } = useContext(BeerContext);

  const [street, setStreet] = useState('');
  const [houseNumber, setHouseNumber] = useState('');
  const [localCart, setLocalCart] = useState(() => {
    const localValue = JSON.parse(localStorage.getItem('cart'));
    if (!localValue === undefined || !localValue === null) {
      return localValue;
    }
    return ({ 0: { product: { price: 0 }, quantity: 0 } });
  });
  const [endSale, setEndSale] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setLocalCart(JSON.parse(localStorage.getItem('cart')));
      const cart1 = JSON.parse(localStorage.getItem('cart'));
      setLocalCart(Object.values(cart1)
        .filter((product) => product.quantity > 0 && product.product.id));
    }
  }, [cart]);

  if (!localStorage.getItem('token')) {
    return (<Redirect to="/login" />);
  }

  const finalValue = Object.values(localCart).reduce((t, { quantity, product }) => {
    if (!Number.isNaN(parseFloat(product.price))) {
      return t + quantity * parseFloat(product.price);
    }
    return 0;
  }, 0);

  const accPrice = (price) => parseFloat(price).toFixed(2).toString().replace('.', ',');

  const backToProducts = () => push('/products');
  const timeToGoToProducts = 2000;

  const finalizarPedido = async (e) => {
    const body = {
      deliveryAddress: street,
      deliveryNumber: houseNumber,
      listProducts: localCart.map((product) => ({
        [product.product.id]: product.quantity,
      }))
        .reduce((acc, atual) => {
          const valor = Object.values(atual)[0];
          const key = Object.keys(atual);
          acc[key] = valor;
          return acc;
        }, {}),
    };
    const token = JSON.parse(localStorage.getItem('token'));
    e.preventDefault();
    await sendProducts(body, token);
    setEndSale(true);
    localStorage.setItem('cart', JSON.stringify({
      0: { product: { price: 0 }, quantity: 0 },
    }));
    setTimeout(backToProducts, timeToGoToProducts);
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
      {endSale && <span>Compra realizada com sucesso!</span>}
    </div>);
};

export default Checkout;
