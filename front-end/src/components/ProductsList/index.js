import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { getProducts } from '../../services/apiService';

export default function ProductsList() {
  const [products, setProducts] = useState(null);
  const [productQtt, setProductQtt] = useState(0);
  const [totalValue, setTotalValue] = useState('00,00');
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      const currentUser = JSON.parse(localStorage.getItem('user'));

      const response = await getProducts(currentUser.token)
        .then((apiResponse) => apiResponse);

      setProducts(response.map((item) => ({ ...item, productQtt })));
      setTotalValue(0);
    };

    fetchProducts();
  }, [productQtt]);

  const addProdQtt = (e, id) => {
    const { name } = e.target;
    if (Number(name) === id) {
      const addProdValue = productQtt + 1;
      setProductQtt(addProdValue);
    }
  };

  return (
    <div style={ { display: 'flex', flexDirection: 'column', alignItems: 'center' } }>
      { !products ? <span>Loading...</span>
        : products.map((item, index) => (
          <div key={ item.id }>
            <img
              style={ { width: '100px' } }
              src={ item.url_image }
              alt={ item.name }
              data-testid={ `${index}-product-img` }
            />
            <p data-testid={ `${index}-product-name` }>{item.name}</p>
            <p data-testid={ `${index}-product-price` }>
              R$
              {item.price.replace('.', ',')}
            </p>
            <button
              type="button"
              name={ item.id }
              data-testid={ `${index}-product-plus` }
              onClick={ (e) => addProdQtt(e, item.id) }
            >
              +
            </button>
            <span data-testid={ `${index}-product-qtd` }>{item.productQtt}</span>
            <button
              type="button"
              data-testid={ `${index}-product-minus` }
            >
              -
            </button>
          </div>
        ))}
      <footer
        style={ { background: 'gray', bottom: '0', position: 'fixed', padding: '10px' } }
      >
        <span data-testid="checkout-bottom-btn-value">{`R$ ${totalValue}`}</span>
        <button
          type="button"
          data-testid="checkout-bottom-btn"
          onClick={ () => history.push('/checkout') }
        >
          Ver Carrinho
        </button>
      </footer>
    </div>
  );
}
