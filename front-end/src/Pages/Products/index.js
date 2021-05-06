import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import verifyUserLocalStorage from '../../util/changeLocalStorage';
import TryBeerContext from '../../context/TryBeerContext';
import { Link } from 'react-router-dom';
import TopBar from '../../Components/TopBar';
import { getProducts } from '../../servicesAPI/api';
import ProductCard from '../../Components/ProductCard';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalPrice, setTotalPrice } = useContext(TryBeerContext);
  const history = useHistory();

  useEffect(() => {
    const { data } = verifyUserLocalStorage();
    console.log(data);
    if (!data) return history.push('/login');
  }, [history]);

  const getProductList = async () => {
    const { data } = await getProducts();
    if (!localStorage.getItem('cart')) {
      const cart = data.map(product => {
        return { ...product, quantity: 0 };
      })
      setProducts(cart);
      localStorage.setItem('cart', JSON.stringify(cart));
      localStorage.setItem('totalCartPrice', JSON.stringify(0));
    } else {
      const totalPriceLS = JSON.parse(localStorage.getItem('totalCartPrice'));
      setTotalPrice(totalPriceLS);
      const productsLS = JSON.parse(localStorage.getItem('cart'));
      setProducts(productsLS);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    getProductList();
  }, []);

  return (
    <div> 
      <TopBar />
      { isLoading ? <div>Carregando</div> : products?.map((product, index) => (
        <ProductCard product={ product } index={ index } key={ index }/>
      ))
      }
      <Link to="/checkout">
      <button type="button" disabled={ totalPrice === 0 } data-testid="checkout-bottom-btn">
          Ver Carrinho
          <div data-testid="checkout-bottom-btn-value">
            {totalPrice === 0 ? 'R$ 0,00' : `R$ ${Number(totalPrice).toFixed(2).replace('.',',')}`}
          </div>
      </button>
      </Link>
    </div>
  );
};

export default Products;
