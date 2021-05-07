import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import MenuTopMobile from '../../components/MenuTopMobile';
import SideBarMobile from '../../components/SideBarMobile';
import MyContext from '../../context/Context';

function Checkout() {
  const {
    sideIsActive,
    setPageTitle,
    total,
    setTotal,
  } = useContext(MyContext);

  const [userId, setUserId] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [checkoutMsg, setCheckoutMsg] = useState('');

  const history = useHistory();

  useEffect(() => {
    setPageTitle('Finalizar Pedido');
  }, [setPageTitle]);

  useEffect(() => {
    const getUser = () => {
      const userStorage = JSON.parse(localStorage.getItem('user'));
      if (!userStorage) return history.push('/login');
      return setUserId(userStorage.id);
    };
    getUser();
  }, [history]);

  useEffect(() => {
    const getCart = () => {
      setIsLoading(true);
      const cartStorage = JSON.parse(localStorage.getItem('cart'));
      const totalStorage = JSON.parse(localStorage.getItem('totalCart'));
      if (cartStorage) {
        return (
          setCart(cartStorage),
          setTotal(totalStorage)
        );
      }
    };
    getCart();
    setIsLoading(false);
  }, [setTotal]);

  const handleDelete = ({ target }) => {
    const products = cart.filter((product) => product.name !== target.value);
    localStorage.setItem('cart', JSON.stringify(products));
    setCart(products);
    const sumCart = JSON.parse(localStorage.getItem('cart'))
      .reduce((totalItem, actual) => actual.totalItem + totalItem, 0);
    localStorage.setItem('totalCart', JSON.stringify(sumCart));
    setTotal(sumCart);
  };

  const CREATED = 201;
  const TWOSECONDS = 2000;

  const finished = () => history.push('/products');

  const handleFinish = () => {
    fetch('http://localhost:3001/checkout', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        totalCart: total,
        address,
        addressNumber,
        status: 'Pendente',
      }),
    }).then((response) => response.status)
      .then((data) => {
        if (data !== CREATED) {
          setCheckoutMsg('fail');
        } else {
          setCheckoutMsg('success');
        }
      })
      .then(setTimeout(finished, TWOSECONDS));
  };

  return (
    <div>
      <MenuTopMobile />
      { sideIsActive && <SideBarMobile /> }
      { isLoading ? <span>Carregando...</span>
        : (
          <div>
            <h2>Produtos</h2>

            { !total && <h2>Não há produtos no carrinho</h2> }

            <ul>
              { cart.map((product, index) => (
                <li key={ index }>
                  <span data-testid={ `${index}-product-qtd-input` }>
                    {product.quantity}
                  </span>
                  <span data-testid={ `${index}-product-name` }>{product.name}</span>
                  <span data-testid={ `${index}-product-total-value` }>
                    { Number(product.totalItem)
                      .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
                  </span>
                  <span data-testid={ `${index}-product-unit-price` }>
                    {`(${Number(product.price)
                      .toLocaleString('pt-BR', {
                        style: 'currency', currency: 'BRL' })} un)`}
                  </span>
                  <button
                    type="button"
                    data-testid={ `${index}-removal-button` }
                    value={ product.name }
                    onClick={ (e) => handleDelete(e) }
                  >
                    X
                  </button>
                </li>
              ))}
            </ul>
            <h3 data-testid="order-total-value">
              {`Total: R$ ${Number(total).toFixed(2).replace('.', ',')}`}
            </h3>
            <h2>Endereço</h2>
            <form>
              <label htmlFor="checkout-street-input">
                Rua:
                <input
                  id="checkout-street-input"
                  data-testid="checkout-street-input"
                  type="text"
                  onChange={ (e) => setAddress(e.target.value) }
                />
              </label>
              <label htmlFor="checkout-house-number-input">
                Número da casa:
                <input
                  id="checkout-house-number-input"
                  data-testid="checkout-house-number-input"
                  type="text"
                  onChange={ (e) => setAddressNumber(e.target.value) }
                />
              </label>
            </form>
            <button
              type="button"
              data-testid="checkout-finish-btn"
              disabled={ !address || !addressNumber || !total }
              onClick={ handleFinish }
            >
              Finalizar Pedido
            </button>
          </div>
        )}
      <span>
        {checkoutMsg === 'fail' ? 'Ocorreu um erro!'
          : 'Compra realizada com sucesso!'}
      </span>
    </div>
  );
}

export default Checkout;
