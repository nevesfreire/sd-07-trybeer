import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import Header from '../../Components/Header';
// import trybeerContext from '../../Context/TrybeerContext';

function Checkout() {
  // const { products, setProducts } = useContext(trybeerContext);
  const [products, setProducts] = useState([]);
  const num = 0;
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')));
  const [total, setTotal] = useState(num);
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [sucesso, setSucesso] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [logado] = useState(true);
  const time = 2000;
  const history = useHistory();

  function getQtd(id) {
    if (cart.length === 0) {
      return 0;
    }
    const add = cart.find((product) => product.id === id);
    return add.qtd;
  }

  useEffect(() => {
    // products.map((product) => {
    //   sum += parseFloat(product.price) * getQtd(product.id);
    // });

    const valorInicial = 0;
    const sum = products.reduce(
      (accumulator, product) => parseFloat(accumulator + product.price * getQtd(product.id)),
      valorInicial,
    );

    setTotal(sum);
    if (localStorage.getItem('cart') === null) setCart([]);

    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((products1) => {
        setProducts(products1);
      });

    setIsLoading(false);
  }, [getQtd, products]);

  useEffect(() => {
    const valorInicial = 0;
    const sum = products.reduce(
      (accumulator, product) => parseFloat(accumulator + product.price * getQtd(product.id)),
      valorInicial,
    );
  }, [cart, getQtd, logado, products]);

  if (localStorage.getItem('user') === null) {
    return <Redirect to="/login" />;
  }

  // function sumTotal(products1) {
  //   const valorInicial = 0;
  //   const sum = products1.reduce(
  //     (accumulator, product) =>
  //       parseFloat(accumulator + product.price * getQtd(product.id)),
  //     valorInicial,
  //   );
  //   setTotal(sum);
  // }

  // function getName(id) {
  //   return products[id].name;
  // }

  // function getPrice(id) {
  //   return products[id].price;
  // }

  function del(event) {
    const id = parseInt(event.target.name, 10);
    const add = cart.find((product) => product.id === id);
    add.qtd = 0;
    setCart([...cart.filter((product) => product.id !== id), add]);
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  function ruaHandle(event) {
    setRua(event.target.value);
  }

  function numeroHandle(event) {
    setNumero(event.target.value);
  }

  function finalizar() {
    const initialCart = () => {
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
    localStorage.setItem('cart', JSON.stringify(initialCart()));

    setSucesso(true);

    setTimeout(() => {
      history.push('/products');
    }, time);
  }

  console.log(products);

  return (
    <div>
      {isLoading || products.length === 0 ? (
        <div>carregando</div>
      ) : (
        <div>
          <h1>Aqui é Checkout</h1>
          <Header />
          {total === 0 && <div>Não há produtos no carrinho</div>}
          {cart
            .filter((product) => product.qtd !== 0)
            .map((product, index) => (
              <div key={ index }>
                ID:
                {' '}
                {product.id}
                <div data-testid={ `${index}-product-qtd-input` }>
                  Quantidade:
                  {' '}
                  {product.qtd}
                </div>
                <div data-testid={ `${index}-product-name` }>
                  {product.name}
                  {' '}
                  --
                  {' '}
                </div>
                Preço Unitário:
                {' '}
                <div data-testid={ `${index}-product-unit-price` }>
                  (R$
                  {' '}
                  {product.price.replaceAll('.', ',')}
                  {' '}
                  un) --
                  {' '}
                </div>
                Preço Total:
                {' '}
                <div data-testid={ `${index}-product-total-value` }>
                  R$
                  {' '}
                  {parseFloat(product.qtd * product.price)
                    .toFixed(2)
                    .replaceAll('.', ',')}
                </div>
                <button
                  type="button"
                  data-testid={ `${index}-removal-button` }
                  name={ product.id }
                  onClick={ del }
                >
                  excluir ID:
                  {' '}
                  {product.id}
                </button>
              </div>
            ))}
          Total:
          {' '}
          <div data-testid="order-total-value">
            R$
            {' '}
            {total.toFixed(2).replaceAll('.', ',')}
          </div>
          <label htmlFor="rua-input">
            rua
            <input
              data-testid="checkout-street-input"
              type="text"
              name="rua"
              onChange={ ruaHandle }
            />
          </label>
          <label htmlFor="numero-input">
            número da casa
            <input
              data-testid="checkout-house-number-input"
              type="number"
              name="numero"
              onChange={ numeroHandle }
            />
          </label>
          <button
            type="button"
            disabled={ total === 0 || rua === '' || numero === '' }
            onClick={ finalizar }
            data-testid="checkout-finish-btn"
          >
            Finalizar Pedido
          </button>
        </div>
      )}
      {sucesso && <div>Compra realizada com sucesso!</div>}
    </div>
  );
}

export default Checkout;
