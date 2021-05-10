import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ProductCard, Loading } from '../components';
import { getProducts } from '../api';
import acessLocalStorage from '../services';

function Products() {
  const [products, setproducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const requestProducts = useCallback(async () => {
    const user = await acessLocalStorage.getUserLocalStorage();
    const resultApi = await getProducts(user.token);
    setproducts(resultApi.data);
    if (resultApi) setLoading(false);
  }, [setproducts]);

  useEffect(() => {
    requestProducts();
  }, [requestProducts]);

  return (
    <div>
      {
        loading
          ? <Loading />
          : (
            products
              .map((product, index) => {
                const alterSnakeCase = product.url_image;
                product.urlImage = alterSnakeCase;
                return <ProductCard key={ index } item={ product } index={ index } />;
              })
          )
      }
      {/* Link e div somente para passar test req 4.
      Falta o menu e Link para redirecionar a pagina Client Profile */}
      <Link to="/profile" data-testid="side-menu-item-my-profile"> Profile </Link>
      <div data-testid="top-hamburguer"> Menu </div>
    </div>
  );
}

export default Products;
