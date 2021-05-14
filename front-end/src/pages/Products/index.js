import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
// import { system } from 'faker';
import BeerAppContext from '../../context/BeerAppContext';
import { requestGetProductsAPI } from '../../services';
import ProductCard from '../../component/ProductCard';
import TopMenu from '../../component/TopMenu';
import { getToLocalStorage } from '../../utils/localStorage';

function ProductsCards() {
  const {
    totalProducts,
    products,
    setProducts,
  } = useContext(BeerAppContext);
  const history = useHistory();

  const validateToken = () => {
    const user = getToLocalStorage('user');
    // console.log(user);
    if (!user || !user.token) return false;
    return true;
  };

  const HandleRequestGetProducts = async () => {
    if (!validateToken()) {
      return history.push('/login');
    }
    const productsList = await requestGetProductsAPI();
    const { data } = productsList;
    // console.log(productsList);
    if (productsList.status === StatusCodes.UNAUTHORIZED) history.push('/login');
    if (productsList.status === StatusCodes.OK) setProducts(data);
  };

  useEffect(() => {
    HandleRequestGetProducts();
  }, [HandleRequestGetProducts]);

  if (!products.length) return <h1>LOADING...</h1>;

  return (
    <div>
      <TopMenu title="TryBeer" />
      {products.map((product) => (
        <ProductCard key={ product.id } product={ product } />
      ))}
      <button
        type="button"
        data-testid="checkout-bottom-btn"
        onClick={ () => history.push('/checkout') }
        disabled={ totalProducts === 'R$ 0,00' }
      >
        Ver Carrinho
        <span data-testid="checkout-bottom-btn-value">{` ${totalProducts}`}</span>
      </button>
    </div>
  );
}

export default ProductsCards;
