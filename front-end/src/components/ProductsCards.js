import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Context';

function ProductsCards() {
  const history = useHistory();

  const { products, total, setTotal } = useContext(MyContext);

  const getQuantity = (name) => {
    if (JSON.parse(localStorage.getItem('cart'))) {
      const cartItem = JSON.parse(localStorage.getItem('cart'))
        .find((item) => item.name === name);
      return cartItem === undefined ? 0 : cartItem.quantity;
    }
    return 0;
  };

  const setTotalCart = () => {
    const sumCart = JSON.parse(localStorage.getItem('cart'))
      .reduce((totalItem, actual) => actual.totalItem + totalItem, 0);
    return (
      localStorage.setItem('totalCart', JSON.stringify(sumCart)),
      setTotal(sumCart)
    );
  };

  const addInCart = (id, name, price) => {
    if (JSON.parse(localStorage.getItem('cart'))) {
      const cartItem = JSON.parse(localStorage.getItem('cart'))
        .find((item) => item.name === name);
      if (!cartItem) {
        const newCartStorage = [...JSON.parse(localStorage.getItem('cart')), {
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
      const newCartItem = {
        ...cartItem,
        quantity: cartItem.quantity + 1,
        totalItem: cartItem.totalItem + Number(price),
      };
      const newCartStorage = [...JSON.parse(localStorage.getItem('cart'))
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
        onClick={ () => history.push('/checkout') }
        disabled={ total === 0 }
      >
        Ver Carrinho &nbsp;
        <span data-testid="checkout-bottom-btn-value">
          { total && total
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
        </span>
      </button>
    </div>
  );
}

export default ProductsCards;
