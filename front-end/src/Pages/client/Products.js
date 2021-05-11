import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { Redirect, Route, useHistory } from "react-router-dom";
import ListCardsProduts from "../../Components/ListCardsProduts";

function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState("");
  const [total, setTotal] = useState(999);
  const [logado, setLogado] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  if (user) setLogado(true);

  useEffect(() => {
    setIsLoading(true);
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

        console.log(logado);

        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let sum = 0;

    products.map((product) => {
      sum += parseFloat(product.price) * getQtd(product.id);
    });

    setTotal(sum);
  }, [cart]);

  const history = useHistory();

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
    const add = cart.find((product) => product.id === id);
    return add.qtd;
  }

  // console.log(JSON.parse(localStorage.getItem('user')) === '')
  // console.log(JSON.parse(localStorage.getItem('user')) !== '')

  // const xablau = JSON.parse(localStorage.getItem('user'))

  // let vazio

  // if (xablau === '') vazio = true
  // else vazio = false

  return (
    <div>
      {logado ? (
        <Redirect to="login" />
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
