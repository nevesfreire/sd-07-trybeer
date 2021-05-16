import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { StatusCodes } from 'http-status-codes';
import BeerAppContext from '../../context/BeerAppContext';
import { requestChangeStatusAPI, requestGetOrderAPI } from '../../services';
import TopMenu from '../../component/TopMenu';
import DetailsCard from '../../component/DetailsCard';
import { getToLocalStorage } from '../../utils/localStorage';
import './style.css';

function AdminOrdersDetails() {
  const [products, setProducts] = useState([]);
  const [roleUser, setRoleUser] = useState('');
  const [title, setTitle] = useState('');
  const { convertPrice } = useContext(BeerAppContext);
  const { id } = useParams();
  const history = useHistory();

  const validateToken = () => {
    const user = getToLocalStorage('user');
    const { role } = user;
    setRoleUser(role);
    // if (!user || !user.token) return false;
    // return true;
  };

  const handleRequestOrder = async () => {
    validateToken();
    const result = await requestGetOrderAPI(id);
    if (result.status !== StatusCodes.OK) {
      history.push('/');
    } else {
      setProducts(result.data);
      setTitle(result.data[0].status);
    }
  };

  const handleToDelivery = async () => {
    const result = await requestChangeStatusAPI(id);
    if (result.status === StatusCodes.OK) {
      console.log(result.data.status);
      setTitle(result.data.status);
    }
  };

  useEffect(() => {
    handleRequestOrder();
  }, []);

  return (
    <div className='admin-orders-details-container'>
      <TopMenu title={ `Admin - Detalhes de Pedido - ${title}` } />
      <div className='admin-orders-details-card-container'>
        
        <div className='orders-details-number-status'>
          <h2 data-testid="order-number">
            {products.length && `Pedido ${id}`}
          </h2>
          <h2 data-testid="order-status" id={title === 'Pendente' ? 'status-pendente' : 'status-entregue'}>
            {products.length && `${title}`}
          </h2>
        </div>

        <div className='card-container'>
          {products.length
            && products.map((item) => (
              <DetailsCard key={ item.id } product={ item } role={ roleUser } />
            ))}
        </div>

        <h2 data-testid="order-total-value">
          {products.length && `Total: ${convertPrice(products[0].total_price)}`}
        </h2>
      </div>

      {title === 'Pendente' && (
        <button
          className="button-final"
          data-testid="mark-as-delivered-btn"
          type="button"
          onClick={ () => handleToDelivery() }
        >
          Marcar como entregue
        </button>
      )}
    </div>
  );
}

export default AdminOrdersDetails;
