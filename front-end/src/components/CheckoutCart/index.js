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
    <div>
      <p>Produtos</p>
      { total === '0.00' || total === 0 ? <p>Não há produtos no carrinho</p>
        : productCheckout.filter((item) => item.productQtt !== 0)
          .map((product, index) => (
            <div key={ product.name }>
              <p data-testid={ `${index}-product-qtd-input` }>{product.productQtt}</p>
              <p data-testid={ `${index}-product-name` }>{product.name}</p>
              <p data-testid={ `${index}-product-total-value` }>
                {`R$ ${(product.price * product.productQtt)
                  .toFixed(2).replace('.', ',')}`}
              </p>
              <p data-testid={ `${index}-product-unit-price` }>
                {`(R$ ${product.price.replace('.', ',')} un)`}
              </p>
              <button
                type="button"
                data-testid={ `${index}-removal-button` }
                onClick={ () => removeProduct(product.id) }
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
          />
        </label>
        <label htmlFor="number">
          Número da casa:
          <input
            name="number"
            value={ addressNumber }
            onChange={ (e) => setAddressNumber(e.target.value) }
            type="text"
            data-testid="checkout-house-number-input"
          />
        </label>
      </form>
      {saleComplete && <p>{saleMessage}</p>}
      <button
        type="submit"
        data-testid="checkout-finish-btn"
        disabled={ !(total > 0 && addressName && addressNumber) }
        onClick={ () => submitSale() }
      >
        Finalizar Pedido
      </button>
    </div>
  );
}
