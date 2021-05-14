import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
// import trybeerContext from "../../Context/TrybeerContext";
function Products() {
  const [products, setProducts] = useState([]);
  const num = 0;
  const [isLoading, setIsLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(num);
  const [logado] = useState(true);
  const initialCart = () => {
    if (localStorage.getItem('cart') !== null) {
      return JSON.parse(localStorage.getItem('cart'));
    }
    const array = [];
    for (let id = 1; id <= products.length; id += 1) {
      array.push({
        id,
        qtd: 0,
        name: products[id - 1].name,
        price: products[id - 1].price,
      });
    }
    return array;
  };
  useEffect(() => {
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((products1) => {
        setProducts(products1);

        initialCart();
        setCart(initialCart());
        setIsLoading(false);
      });
  }, [initialCart, products]);
  
  function getQtd(id) {
    if (cart.length === 0) {
      return 0;
    }
    const add = cart.find((product) => product.id === id);
    return add.qtd;
  }
  useEffect(() => {
    let sum = 0;
    products.map((pdt) => {
      sum += parseFloat(pdt.price) * getQtd(pdt.id);
      return 0;
    });
    setTotal(sum);
  }, [cart, getQtd, products]);
  const history = useHistory();
  function sumTotal(products1) {
    const valorInicial = 0;
    const sum = products1
      .reduce((accumulator, prod) => parseFloat(
        accumulator + prod.price * getQtd(prod.id),
      ),
      valorInicial);
    setTotal(sum);
  }

  function addQuantity(id) {
    const add = cart.find((product) => product.id === id);
    add.qtd += 1;
    setCart([...cart.filter((product) => product.id !== id), add]);
    localStorage.setItem('cart', JSON.stringify(cart));
    sumTotal(products);
    // let sum = 0;
    // products.map((product) => {
    //   sum += parseFloat(product.price) * getQtd(product.id);
    // });
    // setTotal(sum);
    // return 0;
  }
  function subQuantity(id) {
    const add = cart.find((product) => product.id === id);
    if (add.qtd > 0) add.qtd -= 1;
    setCart([...cart.filter((product) => product.id !== id), add]);
    localStorage.setItem('cart', JSON.stringify(cart));
    sumTotal(products);
  }
  if (!localStorage.getItem('user') && !localStorage.getItem('cadUser')) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      {!logado ? (
        <Redirect to="/login" />
      ) : (
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
                  data-testid={
                    `${index}-product-img`
                  }
                  src="Becks.jpg"
                  alt="Becks.jpg"
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
      )}
    </div>
  );
}

export default Products;
