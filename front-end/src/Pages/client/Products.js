import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { Redirect, Route, useHistory } from "react-router-dom";
import ListCardsProduts from "../../Components/ListCardsProduts";

function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(999);
  const [logado, setLogado] = useState(true);

  useEffect(() => {
    // loggedUser()

    // const userOn = localStorage.getItem('user')

    // if (!userOn) setLogado(true)

    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((products) => {
        setProducts(products);

        const initialCart = () => {
          if (localStorage.getItem("cart") !== null) {
            return JSON.parse(localStorage.getItem("cart"));
          }

          let array = [];
          for (let id = 1; id <= products.length; id++) {
            array.push({ id, qtd: 0 });
          }
          return array;
        };

        setCart(initialCart());

        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let sum = 0;

    products.map((product) => {
      sum += parseFloat(product.price) * getQtd(product.id);
    });

    console.log('2', logado)

    setTotal(sum);
  }, [cart]);

  const history = useHistory();

  // const loggedUser = () => {
  //   const userOn = localStorage.getItem('user');
  //   console.log('Entrou');
  //   console.log(userOn);

  //   if (userOn !== null) setLogado(true)
  // }

  function addQuantity(id) {
    let add = cart.find((product) => product.id === id);
    add.qtd += 1;
    setCart([...cart.filter((product) => product.id !== id), add]);
    localStorage.setItem("cart", JSON.stringify(cart));

    let sum = 0;

    products.map((product, index) => {
      sum += parseFloat(product.price) * getQtd(product.id);
    });

    setTotal(sum);
  }

  function subQuantity(id) {
    const add = cart.find((product) => product.id === id);
    if (add.qtd > 0) add.qtd -= 1;
    setCart([...cart.filter((product) => product.id !== id), add]);
    localStorage.setItem("cart", JSON.stringify(cart));

    let sum = 0;

    products.map((product, index) => {
      sum += parseFloat(product.price) * getQtd(product.id);
    });

    setTotal(sum);
  }

  function getQtd(id) {
    if (cart.length === 0 ) {
      return 0;
    }
    const add = cart.find((product) => product.id === id);

    return add.qtd;
  }

  // const loggedUser = () => {
  //   localStorage.getItem('user');
  //   console.log('Entrou');
  //   console.log(user);

  //   if (user !== '' || user !== undefined) setLogado(true)
  // }

  // console.log(logado);

  // console.log(JSON.parse(localStorage.getItem('user')) === '')
  // console.log(JSON.parse(localStorage.getItem('user')) !== '')

  // const xablau = JSON.parse(localStorage.getItem('user'))

  // let vazio

  // if (xablau === '') vazio = true
  // else vazio = false

  // const user = JSON.parse(localStorage.getItem("user"));
  console.log('1', logado)

  if (!localStorage.getItem('user')) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      { !logado ? (
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
              <div className="App" key={e.id}>
                <img data-testid={`${index}-product-img`} src="Becks.jpg" />
                <div>{e.url_image}</div>
                <div data-testid={`${index}-product-name`}>{e.name}</div>
                <div data-testid={`${index}-product-price`}>
                  R$ {e.price.replaceAll(".", ",")}
                </div>
                <button
                  data-testid={`${index}-product-plus`}
                  name={"plus ".concat(e.id)}
                  onClick={() => {
                    addQuantity(e.id);
                  }}
                >
                  +
                </button>
                <span
                  data-testid={`${index}-product-qtd`}
                  type="number"
                  name={"quantity".concat(e.id)}
                >
                  {getQtd(e.id)}
                </span>

                <button
                  data-testid={`${index}-product-minus`}
                  name={"plus ".concat(e.id)}
                  onClick={() => {
                    subQuantity(e.id);
                  }}
                >
                  -
                </button>
                <hr />
              </div>
            ))
          )}
          <button
            disabled={total === 0}
            data-testid="checkout-bottom-btn"
            onClick={() => {
              history.push("/checkout");
            }}
          >
            <div>
              Ver Carrinho
              <div data-testid="checkout-bottom-btn-value">
                R$ {parseFloat(total).toFixed(2).replaceAll(".", ",")}
              </div>
            </div>
          </button>
        </div>
      )}
    </div>
  );
}

export default Products;
