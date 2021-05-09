import React, { useState, useContext, useEffect } from 'react';
import BeerContext from '../../../context/beerContext';
import TopMenu from '../../../commons/simple/TopMenu';
import ProductsCard from '../../../components/productsCard';
import getProductsRequest from '../../../services/productsApi';

function Products() {
  const { products, setProducts, isFetching, setIsFetching } = useContext(BeerContext);
  const [cartPreview, setCartPreview] = useState(0);

  const setCart = () => {
    let cart = localStorage.getItem('cart');
    if (cart === null) {
      cart = [];
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  };

  const updateCartPreview = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let cartSum = 0;
    if (cart.length > 0) {
      cart.forEach((product) => {
        cartSum += product.price * product.quantity;
      });
    }
    setCartPreview(cartSum.toFixed(2));
  };

  const renderProducts = async () => {
    const result = await getProductsRequest();
    setProducts(result.data);
  };

  useEffect(() => {
    renderProducts();
    setCart();
  }, []);
  console.log(products);

  return (
    <>
      <TopMenu title="TryBeer" />
      <h1>Product Screen</h1>
      {products.map((product) => (<ProductsCard
        key={ product.id }
        id={ product.id }
        name={ product.name }
        price={ product.price }
        image={ product.url_image }
        updateCart={ updateCartPreview }
      />))}
      <button
        type="button"
        data-testid="checkout-bottom-btn"
      >
        Ver Carrinho
        <span
          data-testid="checkout-bottom-btn-value"
        >
          {' '}
          R$:
          {' '}
          {cartPreview}
        </span>
      </button>

    </>
  );
}

export default Products;
