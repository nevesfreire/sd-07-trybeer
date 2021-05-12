import React, { useEffect, useState } from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import useFetch from '../hooks/useFetch';

function Checkout() {
  const { postSales } = useFetch(); // função post tabela venda, terá que ficar no botão de finalizar compra
  const [listProducts, setListProducts] = useState([]);
  const [localStorageSalved, setLocalStorageSalved] = useState([]);
  const [user, setUser] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
  });

  console.log('listProducts: ', listProducts);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const user = JSON.parse(savedUser);
    setUser(user.user);
    const savedProdcuts = localStorage.getItem('products');
    const list = JSON.parse(savedProdcuts);
    setLocalStorageSalved(list);
    console.log(list)

    let urls = list.map(product => `http://localhost:3001/products/${product.id}`);
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then(response => response.json()))
    ).then(result => setListProducts(result))
  }, [])

  const listProductsWithPrice = () => {
    if (listProducts.length > 0) {
      const lista = localStorageSalved.map((product, index) => {
        return {
          ...product,
          price: Number(listProducts[index].price),
          name: listProducts[index].name,
        }
      });
      return setLocalStorageSalved(lista);
    }
  }

  useEffect(() => {
    listProductsWithPrice();
  }, [listProducts]);

  useEffect(() => {
    const total = localStorageSalved.reduce((acumulador, product) => {
      const totalPricePerProduct = Number(product.quantity) * Number(product.price);
      return acumulador + totalPricePerProduct;
    }, 0);
    console.log('total: ', total);
    console.log('typeOf Total: ', typeof total);
    setTotalPrice(total);
  }, [localStorageSalved]);

  const handleInputs = (input, { target }) => {
    setAddress({ ...address, [input]: target.value });
  };

  const handleCheckout = () => {
    postSales('Pendente', user, address, totalPrice, localStorageSalved);
    const user = localStorage.getItem('user')
    localStorage.clear();
    localStorage.setItem('user', user);
  }

  return (
    <>
      <HeaderBurguer titulo={"Finalizar Pedido"} data-testid="top-title"/>
      { listProducts.length > 0 ?
        (localStorageSalved.map((product, index) => {
          return (<div key={product.id}>
            <span data-testid={`${index}-product-qtd-input`}>{product.quantity}</span>
            <span data-testid={`${index}-product-name`}>{`${product.name} `}</span>
            <span data-testid={`${index}-product-total-value`}>{`R$ ${product.quantity * product.price} `}</span>
            <span data-testid={`${index}-product-unit-price`}>{`(R$ ${product.price} un) `}</span>
            <button type="button" data-testid={`${index}-removal-button`}>X</button>
          </div>)
        }))
        : (<div> Loading... </div>)}

      <div data-testid="order-total-value">Total: {totalPrice} </div>

      <input
        type="text"
        data-testid="checkout-street-input"
        onChange={(event) => handleInputs('deliveryAddress', event)}
      />
      <input
        type="text"
        data-testid="checkout-house-number-input"
        onChange={(event) => handleInputs('deliveryNumber', event)}
      />
      <button
        type="button"
        data-testid="checkout-finish-btn"
        onClick={handleCheckout}>
          Finalizar Pedido
      </button>
    </>
  );
}

export default Checkout;
