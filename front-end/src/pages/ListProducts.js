import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { Header, ProductCard, Loading } from '../components';

// import TrybeerContext from '../store/context';

import { getProducts } from '../api';
import acessLocalStorage from '../services';

function Products() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const history = useHistory();
  // const { cart, setCart, addProductsToCart } = useContext(TrybeerContext);

  const requestProducts = useCallback(async () => {
    const user = await acessLocalStorage.acessLocalStorage.getUserLocalStorage();
    const resultApi = await getProducts(user.token);
    setproducts(resultApi.data);
    if (resultApi) setLoading(false);
  }, [setproducts]);

  useEffect(() => {
    requestProducts();
  }, [requestProducts]);

  return (
    <>
      <div>
        <Header title="TryBeer" />
      </div>
      <div>
        {
          loading
            ? <Loading />
            : (
              <div>
                {
                  products
                    .map((product, index) => {
                      const alterSnakeCase = product.url_image;
                      product.urlImage = alterSnakeCase;
                      return (<ProductCard
                        key={ index }
                        item={ product }
                        index={ index }
                      />);
                    })
                }
                <button
                  type="button"
                  data-testid="checkout-bottom-btn"
                  onClick={ () => history.push('/checkout') }
                  disabled
                >

                  Ver Carrinho
                  <br />
                  <span
                    data-testid="checkout-bottom-btn-value"
                  >
                    R$ 00000
                  </span>
                </button>
              </div>
            )
        }
      </div>
    </>
  );
}

export default Products;
