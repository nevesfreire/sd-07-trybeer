import React, { useState, useContext, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import BeerContext from '../../../context/beerContext';
import TopMenu from '../../../commons/simple/TopMenu';
import SideBar from '../../../commons/composed/SideBar';
import ProductsCard from '../../../components/productsCard';
import getProductsRequest from '../../../services/productsApi';

function Products() {
  const {
    products, setProducts,
    isFetching, setIsFetching,
    cartPreview, setCartPreview,
  } = useContext(BeerContext);

  const [isDisabled, setIsDisabled] = useState(true);
  const [role, setRole] = useState('');
  const history = useHistory();

  const updateCartPreview = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    let cartSum = 0;
    if (cart && cart.length > 0) {
      cart.forEach((product) => {
        cartSum += product.price * product.quantity;
      });
      setIsDisabled(false);
    }
    setCartPreview(cartSum.toFixed(2));
  };

  useEffect(() => {
    const getToken = () => {
      const token = localStorage.getItem('token');
      if (!token) return history.push('/login');
      const userData = jwtDecode(token);
      setRole(userData.role);
    };
    getToken();
  }, [history]);

  useEffect(() => {
    const renderProducts = async () => {
      const result = await getProductsRequest();
      setProducts(result.data);
    };
    const setCart = () => {
      let cart = localStorage.getItem('cart');
      if (cart === null) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
      }
      setIsFetching(false);
    };
    renderProducts();
    setCart();
  }, [setIsFetching, setProducts]);

  return (
    <>
      { role !== 'administrator' ? <TopMenu title="TryBeer" />
        : <SideBar isAdmin /> }

      { isFetching && <h1>Loading...</h1>}
      { !isFetching && products.map((product, index) => (<ProductsCard
        key={ product.id }
        id={ product.id }
        name={ product.name }
        price={ product.price }
        image={ product.url_image }
        index={ index }
        updateCart={ updateCartPreview }
      />
      ))}
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        disabled={ isDisabled }
        onClick={ () => history.push('/checkout') }
      >
        Ver Carrinho
      </button>
      <span
        data-testid="checkout-bottom-btn-value"
      >
        {`R$ ${cartPreview.toString().replace('.', ',')}`}
      </span>
    </>
  );
}

export default Products;
