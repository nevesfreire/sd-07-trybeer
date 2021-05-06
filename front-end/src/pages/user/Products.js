import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Products() {
  const {
    sideIsActive,
    setPageTitle,
    cart,
    setCart,
    totalCart,
    setTotalCart } = useContext(MyContext);

  const history = useHistory();

  // TESTA SE O USUÁRIO ESTÁ LOGADO

  // useEffect(() => {
  //   const getUser = () => {
  //     const userStorage = JSON.parse(localStorage.getItem('user'));
  //     if (!userStorage) return history.push('/login');
  //   };
  //   getUser();
  // }, [history]);

  useEffect(() => {
    setPageTitle('TryBeer');
  }, [setPageTitle]);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

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
    const getTotalCart = () => {
      const sumCart = cart.reduce((total, atual) => atual.totalItem + total, 0);
      return setTotalCart(sumCart);
    };
    getTotalCart();
  }, [cart, setTotalCart]);

  const addInCart = (id, name, price) => {
    const productExists = cart.some((item) => item.name === name);
    const cartItem = cart.find((item) => item.name === name);
    if (!productExists) {
      return setCart([...cart, {
        id,
        name,
        price,
        quantity: 1,
        totalItem: Number(price),
      }]);
    }
    const newQuantity = cartItem.quantity + 1;
    const newTotalItem = cartItem.totalItem + Number(price);
    const newCartItem = { ...cartItem, quantity: newQuantity, totalItem: newTotalItem };
    return setCart([...cart.filter((item) => item.name !== name), newCartItem]);
  };

  const getQuantity = (name) => {
    const cartItem = cart.find((item) => item.name === name);
    return cartItem === undefined ? 0 : cartItem.quantity;
  };

  const removeFromCart = (name, price) => {
    const cartItem = cart.find((item) => item.name === name);
    if (cartItem !== undefined) {
      const newQuantity = cartItem.quantity < 1
        ? cartItem.quantity : cartItem.quantity - 1;
      const newTotalItem = cartItem && cartItem.totalItem - Number(price);
      const newCartItem = { ...cartItem, quantity: newQuantity, totalItem: newTotalItem };
      if (newQuantity < 1) return setCart(cart.filter((item) => item.name !== name));
      return setCart([...cart.filter((item) => item.name !== name), newCartItem]);
    }
  };

  const handleClick = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('totalCart', JSON.stringify(totalCart));
    history.push('/checkout');
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
              onClick={ () => handleClick() }
              disabled={ totalCart === 0 }
            >
              Ver Carrinho
              <span data-testid="checkout-bottom-btn-value">
                { totalCart
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
              </span>
            </button>
          </div>
        )}
    </div>
  );
}

export default Products;
