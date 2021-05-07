import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchProductList } from '../services/api';

function Products() {
  const zero = 0;
  const two = 2;
  const history = useHistory();
  const [productList, setProductList] = useState([]);
  const [valorTotal, setValorTotal] = useState('0,00');

  async function listRequest() {
    const list = await fetchProductList();
    setProductList(list);
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) history.push('/login');
    const savedList = localStorage.getItem('productList');
    if (savedList) {
      setProductList(JSON.parse(savedList));
    } else {
      listRequest();
    }
  }, []);

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

  useEffect(() => {
    generateTotal();
  }, [productList]);

  const generateProducts = () => (
    <div
      style={ { marginLeft: `${two}em` } }
    >
      { productList.length === zero
        ? (<h3>Carregando...</h3>)
        : productList.map((item, index) => (
          <div
            key={ index }
          >
            <img
              data-testid={ `${index}-product-img` }
              src={ item.url_image }
              alt="bebida da lista"
              width="50px"
            />
            <p
              data-testid={ `${index}-product-name` }
            >
              { item.name }
            </p>
            <p
              data-testid={ `${index}-product-price` }
            >
              {`R$ ${item.price.replace('.', ',')}`}
            </p>
            <button
              type="button"
              data-testid={ `${index}-product-plus` }
              onClick={ () => {
                const list = [...productList];
                list[index].quantity = list[index].quantity
                  ? list[index].quantity + 1 : 1;
                setProductList(list);
                localStorage.setItem('productList', JSON.stringify(productList));
              } }
            >
              &uArr;
            </button>
            <button
              type="button"
              data-testid={ `${index}-product-minus` }

              onClick={ () => {
                const list = [...productList];
                list[index].quantity = list[index].quantity && list[index].quantity > 0
                  ? list[index].quantity - 1 : 0;
                setProductList(list);
                localStorage.setItem('productList', JSON.stringify(productList));
              } }
            >

              &dArr;
            </button>
            <h3
              data-testid={ `${index}-product-qtd` }
            >
              { item.quantity || 0 }
            </h3>
          </div>
        ))}

      <button
        data-testid="checkout-bottom-btn"
        type="button"
        onClick={ () => history.push('/checkout') }
        disabled={ valorTotal === '0,00' }

      >
        Ver Carrinho:
        <p
          data-testid="checkout-bottom-btn-value"
        >
          R$
          {' '}
          {valorTotal}
        </p>
      </button>
    </div>
  );

  return (
    generateProducts()
  );
}

export default Products;
