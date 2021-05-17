import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createSale } from '../../services/apiService';

export default function CheckoutCart() {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const newProductsList = JSON.parse(localStorage.getItem('newProdList'));
  const totalPrice = JSON.parse(localStorage.getItem('total'));
  const history = useHistory();

  const [addressName, setAddressName] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [total, setTotal] = useState(totalPrice);
  const [productCheckout] = useState(newProductsList);
  const [saleComplete, setSaleComplete] = useState(false);
  const [saleMessage, setSaleMessage] = useState('');

  const removeProduct = (id) => {
    const product = newProductsList.find((item) => item.id === id);
    const value = (total - (product.price * product.productQtt));
    setTotal(value.toFixed(2));
    productCheckout.find((item) => item.id === id).productQtt = 0;
    localStorage.setItem('newProdList', JSON.stringify(productCheckout));
    localStorage.setItem('total', value.toFixed(2));
  };

  const submitSale = async () => {
    const productList = productCheckout.filter((item) => item.productQtt !== 0);
    const sale = productList.map((item) => ({
      productName: item.name,
      quantity: item.productQtt,
      deliveryAddress: addressName,
      deliveryNumber: Number(addressNumber),
    }));
    const response = await createSale(currentUser.token, sale);
    setSaleMessage(response.message);
    setSaleComplete(true);
    const partaMaisZero = 3000;
    setTimeout(() => {
      history.push('/products');
      localStorage.removeItem('total');
      localStorage.removeItem('newProdList');
    }, partaMaisZero);
  };

  if (!currentUser) return null;
  return (
    <div
    className="d-flex flex-column border rounded"
    style={ { marginTop: '5vh', padding: '3vh' } }
    >
      <p>Produtos</p>
      { total === '0.00' || total === 0 ? <p>Não há produtos no carrinho</p>
        : productCheckout.filter((item) => item.productQtt !== 0)
          .map((product, index) => (
            <div key={ product.name }
            className="d-flex border rounded align-items-center"
            style={ { margin: '2vh', padding: '2vh' } }
            >
              <p data-testid={ `${index}-product-qtd-input` }
              style={ { margin: '1vh' } }
              >{product.productQtt}</p>
              <p data-testid={ `${index}-product-name` }
              style={ { margin: '1vh' } }
              >{product.name}</p>
              <p data-testid={ `${index}-product-total-value` }
              style={ { margin: '1vh' } }
              >
                {`R$ ${(product.price * product.productQtt)
                  .toFixed(2).replace('.', ',')}`}
              </p>
              <p data-testid={ `${index}-product-unit-price` }
              style={ { margin: '1vh' } }
              >
                {`(R$ ${product.price.replace('.', ',')} un)`}
              </p>
              <button
                type="button"
                data-testid={ `${index}-removal-button` }
                onClick={ () => removeProduct(product.id) }
                style={ { margin: '1vh' } }
                className="btn btn-outline-primary"
              >
                X
              </button>
            </div>
          ))}
      <p data-testid="order-total-value">
        {total > 0 ? `Total: R$ ${String(total.toFixed(2)).replace('.', ',')}`
          : 'Total: R$ 0,00'}
      </p>
      <p>Endereço</p>
      <form>
        <label htmlFor="street">
          Rua:
          <input
            name="street"
            type="text"
            value={ addressName }
            onChange={ (e) => setAddressName(e.target.value) }
            data-testid="checkout-street-input"
            className="form-control"
          />
        </label>
        <br/>
        <label htmlFor="number">
          Número da casa:
          <input
            name="number"
            value={ addressNumber }
            onChange={ (e) => setAddressNumber(e.target.value) }
            type="text"
            data-testid="checkout-house-number-input"
            className="form-control"
          />
        </label>
      </form>
      {saleComplete && <p>{saleMessage}</p>}
      <button
        type="submit"
        data-testid="checkout-finish-btn"
        disabled={ !(total > 0 && addressName && addressNumber) }
        onClick={ () => submitSale() }
        style={ { width: '20vh', marginTop: '2vh' } }
        className="btn btn-outline-primary align-self-center"
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
