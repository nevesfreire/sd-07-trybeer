import React, { useContext, useEffect, useState } from 'react';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Products() {
  const { sideIsActive, setPageTitle, cart, setCart } = useContext(MyContext);

  useEffect(() => {
    setPageTitle('TryBeer');
  }, [setPageTitle]);

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  // const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setIsLoading(false);
      });
  }, []);

  const addInCart = (id, name, price) => {
    const productExists = cart.some((item) => item.name === name);
    const cartItem = cart.find((item) => item.name === name);
    if (!productExists) return setCart([...cart, { id, name, price, quantity: 1 }]);
    const newQuantity = cartItem.quantity + 1;
    const newCartItem = { ...cartItem, quantity: newQuantity };
    return setCart([...cart.filter((item) => item.name !== name), newCartItem]);

    // console.log('add cart', cart);

    // let productExists;
    // if (cart.length > 1) {
    //   productExists = cart.find((item) => item.id === id);
    // }

    // if (productExists) {
    //   setCart(cart.splice(cart.indexOf(productExists), 1));
    // } // encontre o repetido e remova ele

    // console.log('remove cart', cart);
    // console.log('productExists', productExists);
  };

  const getQuantity = (name) => {
    const cartItem = cart.find((item) => item.name === name);
    return cartItem && cartItem.quantity;
  };

  const removeFromCart = (name) => {
    // setQuantity(quantity < 1 ? quantity : quantity - 1);
    const cartItem = cart.find((item) => item.name === name);
    const newQuantity = cartItem.quantity - 1;
    setCart([...cart, { ...cartItem, quantity: newQuantity }]);
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
                  onClick={ () => removeFromCart(product.name) }
                >
                  -
                </button>
                <span data-testid={ `${index}-product-qtd` }>{ getQuantity(product.name) }</span>
                <button
                  type="button"
                  data-testid={ `${index}-product-plus` }
                  onClick={ () => addInCart(product.id, product.name, product.price) }
                >
                  +
                </button>
              </div>
            ))}
          </div>
        )}
      {/* <button
          type="button"
          data-testid="checkout-bottom-btn"
        >
          Ver Carrinho R${}
        </button> */}
    </div>
  );
}

export default Products;
