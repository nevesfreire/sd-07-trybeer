import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import { Redirect, Route, useHistory } from "react-router-dom";
import ListCardsProduts from "../../Components/ListCardsProduts";

function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3001/products")
      .then((response) => response.json())
      .then((books) => {
        setProducts(books);
        setIsLoading(false);
      });
  }, []);

  const initialCart = () => {
    if (localStorage.getItem("cart")) return localStorage.getItem("cart");
    let array = [];
    for (let id = 0; id < products.length; id++) {
      array.push({ id, qtd: 0 });
    }
    return array;
  };

  // console.log('initialCart',  initialCart())

  const [cart, setCart] = useState([]);

  const [total, setTotal] = useState("");

  const history = useHistory();

  function addQuantity(id) {
    let add = cart.find((product) => product.id === id);
    console.log("add", add);
    if (add) {
      add.qtd += 1;
      setCart([...cart.filter((product) => product.id !== id), add]);
    } else {
      console.log('passou aqui')
      add = {
        id,
        qtd: 1,
      };
      console.log(add);
      console.log(cart)
      setCart([add])
      console.log(cart)
    }

    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function subQuantity(id) {
    let add = cart.find((product) => product.id === id);
    if (add && add.qtd > 0) add.qtd -= 1;
    else
      add = {
        id,
        qtd: 0,
      };
    setCart([...cart.filter((product) => product.id !== id), add]);
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function getQtd(id) {
    if (cart) return 0;
    let add = cart.find((product) => product.id === id);
    if (add) return add.qtd;
    else return 0;
  }

  return (
    <div>
      <Header />
      <h1 data-testid="top-title">Products</h1>
      <hr />
      {isLoading ? (
        <p>carregando</p>
      ) : (
        products.map((e, index) => (
          <div className="App" key={e.id}>
            <img
              data-testid={`${index}-product-img`}
              src="/images/Becks 330ml.jpg"
            />
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
            <input
              data-testid={`${index}-product-qtd`}
              type="number"
              name={"quantity".concat(e.id)}
              value={getQtd(e.id)}
            />

            <button
              data-testid={`${index}-product-plus`}
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
        data-testid="checkout-bottom-btn"
        onClick={() => {
          history.push("/checkout");
        }}
      >
        <div>
          Ver carrinho R$:{" "}
          <div data-testid="checkout-bottom-btn-value">{total}</div>
        </div>
      </button>
    </div>
  );
  /*const [allProducts, setAllProducts] = useState();

  fetch('http://localhost:3001/products', {
      method: 'GET',
    }).then((response) => response.json())
      .then((data) => {
        setAllProducts(data);
      });
  
  return (
    <div>
      <Header />
      <div className="cards">
      {allProducts.map((product) => (
          <ListCardsProduts name={product.name} price={product.price} img={product.url_image} />
        ))}
      </div>
    </div>
  );*/
}

export default Products;
