import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchFinishSale } from '../services/api';
import Details from './Details';

function Checkout() {
  const twoSeconds = 2000;
  const zero = 0;
  const history = useHistory();
  const [productList, setProductList] = useState([]);
  const [number, setNumber] = useState('');
  const [street, setStreet] = useState('');
  const [showMessage, setShowMessage] = useState(true);
  const [valorTotal, setValorTotal] = useState('0,00');

  function didMount() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) history.push('/login');
  }

  useEffect(() => {
    const cartList = localStorage.getItem('cartList');
    const products = localStorage.getItem('productList');
    let savedList = cartList && JSON.parse(cartList).length > 0 ? cartList : products;
    if (savedList) {
      savedList = JSON.parse(savedList)
        .filter((item) => (item.quantity > 0));
      setProductList(savedList);
      localStorage.setItem('cartList', JSON.stringify(savedList));
    } else {
      didMount();
    }
  }, [history]);

  const handleFinish = async () => {
    const cartList = JSON.parse(localStorage.getItem('cartList'));
    const address = { street, number };
    const response = await fetchFinishSale(cartList, address, valorTotal);
    if (response) {
      setShowMessage(false);
      setTimeout(() => {
        setShowMessage(true);
        history.push('/products');
      }, twoSeconds);
      localStorage.removeItem('cartList');
      localStorage.removeItem('productList');
      setProductList([]);
    }
  };

  const generateTotal = () => {
    const total = productList.reduce((acc, item) => {
      let sum = 0;
      if (item.quantity) {
        sum = parseFloat(item.quantity) * parseFloat(item.price);
        return acc + sum;
      }
      return acc;
    }, 0);
    setValorTotal(total.toFixed(2).toString().replace('.', ','));
  };

  const generateProducts = useCallback(() => (
    <div class="main-container mt-5">
      {productList.length === zero
        ? (<h3>Não há produtos no carrinho</h3>)
        : productList
          .map((item, index) => (
            <div className="item-container mb-3" key={ index }>
              <Details item={ item } index={ index } />
              <div class="unt-dlt">
                Unidade:
                <p
                  data-testid={ `${index}-product-unit-price` }
                >
                  { `(R$ ${item.price.replace('.', ',')} un)` }
                </p>
                <button
                  className="btn btn-login"
                  type="button"
                  data-testid={ `${index}-removal-button` }
                  onClick={ () => {
                    const list = [...productList];
                    list.splice(index, 1);
                    setProductList(list);
                    localStorage.setItem('cartList', JSON.stringify(list));
                  } }
                >
                  Remover
                </button>
              </div>
            </div>
          )) }
      Total:
      <p data-testid="order-total-value">
        R$
        {' '}
        {valorTotal}
      </p>

      {!showMessage
        ? (<p hidden={ showMessage }> Compra realizada com sucesso!</p>)
        : (
          <form className="checkout-form">
            Endereço para entrega:
            {' '}
            <br />
            <label className="form-label" htmlFor="street">
              Rua:
              <input
                className="form-control"
                data-testid="checkout-street-input"
                type="text"
                name="street"
                id="street"
                placeholder="Rua"
                onChange={ (event) => setStreet(event.target.value) }
              />
            </label>
            <br />

            <label className="form-label mb-3" htmlFor="number">
              Número:
              <input
                className="form-control"
                data-testid="checkout-house-number-input"
                type="text"
                name="number"
                id="number"
                placeholder="Número"
                onChange={ (event) => setNumber(event.target.value) }
              />
            </label>

            <button
              className="btn btn-generic"
              type="button"
              data-testid="checkout-finish-btn"
              disabled={
                valorTotal === '0,00' || street.length === 0 || number.length === 0
              }
              onClick={ () => handleFinish() }
            >
              Finalizar pedido
            </button>

          </form>
        )}

    </div>
  ));

  useEffect(() => {
    generateTotal();
    generateProducts();
  }, [generateTotal]);

  return (
    <div className="cart">
      <h2>Produtos</h2>
      {generateProducts()}
    </div>
  );
}

export default Checkout;
