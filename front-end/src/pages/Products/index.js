import React, { useEffect, useState, useContext } from 'react';
import { Context } from '../../context';
import ProductCard from '../../components/ProductCard';
import api from '../../services/api';

function Products() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const ctx = useContext(Context);

  useEffect(() => {
    (async () => {
      const response = await api.getProducts();
      setProducts(response);
      setIsLoading(false);
    })();
  }, []);

  return isLoading ? <h1>Carregando</h1> : (
    <section>
      {products.map((product) => <ProductCard key={ product.id } data={ product } />)}
    </section>
  );
}

export default Products;
