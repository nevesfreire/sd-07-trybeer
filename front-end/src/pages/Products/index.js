import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import BeerAppContext from '../../context/BeerAppContext';
import { requestGetProductsAPI } from '../../services';
import ProductCard from '../../component/ProductCard';
import TopMenu from '../../component/TopMenu';
import { getToLocalStorage } from '../../utils/localStorage';

function ProductsCards() {
  const {
    totalProducts, 
    products,
    setProducts
  } = useContext(BeerAppContext);
  const history = useHistory();

  const HandleRequestGetProducts = async () => {
    const products = await requestGetProductsAPI();
    const data = products.data;
    if (products.status === 200) setProducts(data);
  };

  const validateToken = () => {
    const user = getToLocalStorage('user');
    console.log(user);
    if (!user) history.push('/login');
  }

  useEffect(() => {
    validateToken();
    HandleRequestGetProducts();
  }, []);

  if (!products.length) return <h1>LOADING...</h1>;

  return (
    <div>
      <TopMenu title="TryBeer" />
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
      <button
        type='button'
        data-testid='checkout-bottom-btn'
        onClick={() => history.push('/checkout')}
        disabled={ totalProducts === 'R$ 0,00' ? true : false }
        >
        Ver Carrinho
        <span data-testid='checkout-bottom-btn-value'>{ totalProducts}</span>
      </button>
    </div>
  );
}

export default ProductsCards;
