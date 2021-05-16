import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { StatusCodes } from 'http-status-codes';
// import { system } from 'faker';
import BeerAppContext from '../../context/BeerAppContext';
import { requestGetProductsAPI } from '../../services';
import ProductCard from '../../component/ProductCard';
import TopMenu from '../../component/TopMenu';
import { getToLocalStorage } from '../../utils/localStorage';
import Container from './style';

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
    <Container>
      <TopMenu title="TryBeer" />
      <div className="page-body">
        <div className="cards-container">
          <div className="grid">
            {products.map((product) => (
              <ProductCard key={ product.id } product={ product } />
            ))}
          </div>
        </div>
        <button
          className="total-btn"
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => history.push('/checkout') }
          disabled={ totalProducts === 'R$ 0,00' }
        >
          Ver Carrinho
          <span data-testid="checkout-bottom-btn-value">{` ${totalProducts}`}</span>
        </button>
      </div>
    </Container>
  );
}

export default ProductsCards;
