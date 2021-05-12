import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Header from '../../Components/Header';

function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  // const [logado, setLogado] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((productsData) => {
        setProducts(productsData);

        const initialCart = () => {
          if (localStorage.getItem('cart') !== null) {
            return JSON.parse(localStorage.getItem('cart'));
          }

          const array = [];
          for (let id = 1; id <= products.length; id += 1) {
            array.push({ id, qtd: 0 });
          }
          return array;
        };

        setCart(initialCart());

        setIsLoading(false);
      });

  }, [products.length]);

  function getQtd(id) {
    if (cart.length === 0) {
      return 0;
    }
    const add = cart.find((product) => product.id === id);

    return add.qtd;
  }

  function sumTotal(products1) {
    const valorInicial = 0;
    const sum = products1
      .reduce((accumulator, product) => parseFloat(
        accumulator + product.price * getQtd(product.id),
      ),
      valorInicial);

    setTotal(sum);
  }

  useEffect(() => {
    // let sum = 0;

    // products.map((product) => sum += parseFloat(product.price) * getQtd(product.id));

    // const valorInicial = 0;
    // const sum = products
    //   .reduce((accumulator, product) => parseFloat(
    //     accumulator + product.price * getQtd(product.id),
    //   ),
    //   valorInicial);

    // setTotal(sum);

    sumTotal(products);
  }, [cart, getQtd, products, sumTotal]);


  const history = useHistory();

  function addQuantity(id) {
    const add = cart.find((product) => product.id === id);
    add.qtd += 1;
    setCart([...cart.filter((product) => product.id !== id), add]);
    localStorage.setItem('cart', JSON.stringify(cart));

    // let sum = 0;

    // products.map((product) => sum += parseFloat(product.price) * getQtd(product.id));

    // const valorInicial = 0;
    // const sum = products
    //   .reduce((accumulator, product) => parseFloat(
    //     accumulator + product.price * getQtd(product.id),
    //   ),
    //   valorInicial);

    // setTotal(sum);

    sumTotal(products);
  }

  function subQuantity(id) {
    const add = cart.find((product) => product.id === id);
    if (add.qtd > 0) add.qtd -= 1;
    setCart([...cart.filter((product) => product.id !== id), add]);
    localStorage.setItem('cart', JSON.stringify(cart));

    // let sum = 0;

    // products.map((product) => sum += parseFloat(product.price) * getQtd(product.id));

    // const valorInicial = 0;
    // const sum = products
    //   .reduce((accumulator, product) => parseFloat(
    //     accumulator + product.price * getQtd(product.id),
    //   ),
    //   valorInicial);

    // setTotal(sum);

    sumTotal(products);
  }

  if (!localStorage.getItem('user')) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <div>
        <Header />
        <h1 data-testid="top-title">Products</h1>
        <hr />
        {isLoading ? (
          <p>carregando</p>
        ) : (
          products.map((e, index) => (
            <div className="App" key={ e.id }>
              <img
                data-testid={ `${index}-product-img` }
                alt="Imagem ilustrativa do produto"
                src="Becks.jpg"
              />
              <div>{e.url_image}</div>
              <div data-testid={ `${index}-product-name` }>{e.name}</div>
              <div data-testid={ `${index}-product-price` }>
                R$
                {' '}
                {e.price.replaceAll('.', ',')}
              </div>
              <button
                type="button"
                data-testid={ `${index}-product-plus` }
                name={ 'plus '.concat(e.id) }
                onClick={ () => {
                  addQuantity(e.id);
                } }
              >
                +
              </button>
              <span
                data-testid={ `${index}-product-qtd` }
                type="number"
                name={ 'quantity'.concat(e.id) }
              >
                {getQtd(e.id)}
              </span>

              <button
                type="button"
                data-testid={ `${index}-product-minus` }
                name={ 'plus '.concat(e.id) }
                onClick={ () => {
                  subQuantity(e.id);
                } }
              >
                -
              </button>
              <hr />
            </div>
          ))
        )}
        <button
          type="button"
          disabled={ total === 0 }
          data-testid="checkout-bottom-btn"
          onClick={ () => {
            history.push('/checkout');
          } }
        >
          <div>
            Ver Carrinho
            <div data-testid="checkout-bottom-btn-value">
              R$
              {' '}
              {parseFloat(total).toFixed(2).replaceAll('.', ',')}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Products;
