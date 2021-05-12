import React, { useEffect, useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ProductCard from './ProductCardComponent';
import MyContext from '../context/TrybeerContext';

function ProductsComponent() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [jwtInvalid, setJwtInvalid] = useState(false);
  const [redirectToCheckout, setRedirectToCheckout] = useState(false);

  const {
    totalValue,
    setTotalValue,
  } = useContext(MyContext);

  const { getProducts } = useFetch();
  const callAPI = async (userResult) => {
    const resultAPI = await getProducts(userResult);
    if (resultAPI.message) return setJwtInvalid(true);
    setProducts(resultAPI);
    setLoading(false);
  };

  useEffect(() => {
    setJwtInvalid(false);
    const userResult = localStorage.getItem('user');
    const cartResult = localStorage.getItem('TotalValue');
    setTotalValue(Number(cartResult));
    if (!userResult) return setJwtInvalid(true);
    callAPI(userResult);
  }, []);

  if (redirectToCheckout) return (<Redirect to="/checkout" />);
  if (jwtInvalid) return (<Redirect to="/login" />);
  return loading
    ? (<span>tenha fé...</span>)
    : (
      <div>
        {products.map((product, index) => (
          <ProductCard
            key={ product.id }
            product={ product }
            index={ index }
          />
        ))}
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => setRedirectToCheckout(true) }
          disabled={ totalValue <= 0 }
        >
          Ver Carrinho &nbsp;
          <span data-testid="checkout-bottom-btn-value">
            { `R$ ${Number(totalValue).toFixed(2).replace('.', ',')}`}
          </span>
        </button>
      </div>
    );
}

export default ProductsComponent;
