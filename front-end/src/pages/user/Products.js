import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Products() {
  const {
    sideIsActive,
    setPageTitle,
  } = useContext(MyContext);

  const history = useHistory();

  useEffect(() => {
    setPageTitle('TryBeer');
  }, [setPageTitle]);

  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
    };
    getUser();
  }, [history]);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    const totalStorage = JSON.parse(localStorage.getItem('totalCart'));
    setTotal(totalStorage);
  }, []);

  const setTotalCart = () => {
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    const sumCart = cartStorage
      .reduce((totalItem, actual) => actual.totalItem + totalItem, 0);
    return (
      localStorage.setItem('totalCart', JSON.stringify(sumCart)),
      setTotal(sumCart)
    );
  };

  const getQuantity = (name) => {
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartStorage) {
      const cartItem = cartStorage.find((item) => item.name === name);
      return cartItem === undefined ? 0 : cartItem.quantity;
    }
    return 0;
  };

  const addInCart = (id, name, price) => {
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    if (cartStorage) {
      const cartItem = cartStorage.find((item) => item.name === name);
      if (cartItem === undefined) {
        const newCartStorage = [...cartStorage, {
          id,
          name,
          price,
          quantity: 1,
          totalItem: Number(price),
        }];
        return (
          localStorage.setItem('cart', JSON.stringify(newCartStorage)),
          setTotalCart()
        );
      }
      const newQuantity = cartItem.quantity + 1;
      const newTotalItem = cartItem.totalItem + Number(price);
      const newCartItem = { ...cartItem, quantity: newQuantity, totalItem: newTotalItem };
      const newCartStorage = [...cartStorage
        .filter((item) => item.name !== name), newCartItem];
      return (
        localStorage.setItem('cart', JSON.stringify(newCartStorage)),
        setTotalCart()
      );
    }
    const cartItem = {
      id,
      name,
      price,
      quantity: 1,
      totalItem: Number(price),
    };
    return (
      localStorage.setItem('cart', JSON.stringify([cartItem])),
      setTotalCart()
    );
  };

  const removeFromCart = (name, price) => {
    const cartStorage = JSON.parse(localStorage.getItem('cart'));
    const cartItem = cartStorage.find((item) => item.name === name);
    if (cartItem !== undefined) {
      const newQuantity = cartItem.quantity - 1;
      const newTotalItem = cartItem.totalItem - Number(price);
      const newCartItem = { ...cartItem, quantity: newQuantity, totalItem: newTotalItem };
      if (newQuantity < 1) {
        return (
          localStorage.setItem('cart', JSON
            .stringify(cartStorage.filter((item) => item.name !== name))),
          setTotalCart()
        );
      }
      return (
        localStorage.setItem('cart', JSON
          .stringify([...cartStorage.filter((item) => item.name !== name), newCartItem])),
        setTotalCart()
      );
    }
  };

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      {isLoading
        ? <span>Carregando...</span>
        : (
          <div>
            {products.map((product, index) => (
              <div key={ product.id }>
                <img
                  src={ product.url_image.replace(/\s/g, '') }
                  alt={ product.name }
                  data-testid={ `${index}-product-img` }
                />
                <span data-testid={ `${index}-product-name` }>{ product.name }</span>
                <span data-testid={ `${index}-product-price` }>
                  { Number(product.price)
                    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                </span>
                <button
                  type="button"
                  data-testid={ `${index}-product-minus` }
                  onClick={ () => removeFromCart(product.name, product.price) }
                >
                  -
                </button>
                <span data-testid={ `${index}-product-qtd` }>
                  { getQuantity(product.name) }
                </span>
                <button
                  type="button"
                  data-testid={ `${index}-product-plus` }
                  onClick={ () => addInCart(product.id, product.name, product.price) }
                >
                  +
                </button>
              </div>
            ))}
            <button
              type="button"
              data-testid="checkout-bottom-btn"
              onClick={ () => (history.push('/checkout')) }
              disabled={ total === 0 }
            >
              Ver Carrinho &nbsp;
              <span data-testid="checkout-bottom-btn-value">
                { total && total
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
              </span>
            </button>
          </div>
        )}
    </div>
  );
}

export default Products;
