import React, { useEffect, useState } from 'react';
import HeaderBurguer from '../components/HeaderBurger';
import useFetch from '../hooks/useFetch';

function Checkout() {
  const { postSales } = useFetch();
  const [listProducts, setListProducts] = useState([]);
  const [localStorageSalved, setLocalStorageSalved] = useState([]);
  const [user, setUser] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [address, setAddress] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    const userRecovered = JSON.parse(savedUser);
    setUser(userRecovered.user);
    const savedProdcuts = localStorage.getItem('products');
    const list = JSON.parse(savedProdcuts);
    setLocalStorageSalved(list);

    const urls = list.map(product => `http://localhost:3001/products/${product.id}`);
    Promise.all(
      urls.map((url) =>
        fetch(url)
          .then(response => response.json())),
    ).then(result => setListProducts(result));
  }, []);

  const listProductsWithPrice = () => {
    if (listProducts.length > 0) {
      const lista = localStorageSalved.map((product, index) => ({
        ...product,
        price: Number(listProducts[index].price),
        name: listProducts[index].name,
      }
      ));
      return setLocalStorageSalved(lista);
    }
  };

  useEffect(() => {
    listProductsWithPrice();
  }, [listProducts]);

  useEffect(() => {
    const total = localStorageSalved.reduce((acumulador, product) => {
      const totalPricePerProduct = Number(product.quantity) * Number(product.price);
      return acumulador + totalPricePerProduct;
    }, 0);
    setTotalPrice(total);
  }, [localStorageSalved]);

  const handleInputs = (input, { target }) => {
    setAddress({ ...address, [input]: target.value });
  };

  const handleSubmit = () => {
    if (totalPrice > 0
      && address.deliveryAddress.length > 0
      && address.deliveryNumber.length > 0
    ) return false;
    return true;
  };

  const handleCheckout = () => {
    postSales('Pendente', user, address, totalPrice, localStorageSalved);
    const userLS = localStorage.getItem('user');
    localStorage.clear();
    localStorage.setItem('user', userLS);
  };

  const removeProduct = (id) => {
    const list = localStorageSalved.filter((product) => product.id !== id);
    console.log('list', list);
    const newList = list
      .map((product) => ({ id: product.id, quantity: product.quantity }));
    localStorage.setItem('products', JSON.stringify(newList));
    localStorage.setItem('TotalValue', totalPrice);
    setLocalStorageSalved(list);
  };

  return (
    <>
      <HeaderBurguer
        titulo="Finalizar Pedido"
        data-testid="top-title"
      />
      { listProducts.length > 0
        ? (localStorageSalved.map((product, index) => (
          <div key={ product.id }>
            <span data-testid={ `${index}-product-qtd-input` }>{product.quantity}</span>
            <span data-testid={ `${index}-product-name` }>{`${product.name} `}</span>
            <span
              data-testid={ `${index}-product-total-value` }
            >
              {
                `R$ ${(product.quantity * product.price)
                  .toFixed(2).toString().replace('.', ',')} `
              }
            </span>
            <span
              data-testid={ `${index}-product-unit-price` }
            >
              {`(R$ ${(product.price * 1).toFixed(2).toString().replace('.', ',')} un) `}
            </span>
            <button
              type="button"
              data-testid={ `${index}-removal-button` }
              onClick={ () => removeProduct(product.id) }
            >
              X
            </button>
          </div>
        )))
        : (<div> Loading... </div>)}

      <div data-testid="order-total-value">
        Total:
        {totalPrice.toFixed(2).toString().replace('.', ',')}
      </div>
      <input
        type="text"
        data-testid="checkout-street-input"
        onChange={ (event) => handleInputs('deliveryAddress', event) }
      />
      <input
        type="text"
        data-testid="checkout-house-number-input"
        onChange={ (event) => handleInputs('deliveryNumber', event) }
      />
      <button
        type="button"
        disabled={ handleSubmit() }
        data-testid="checkout-finish-btn"
        onClick={ () => handleCheckout() }
      >
        Finalizar Pedido
      </button>
    </>
  );
}

export default Checkout;
