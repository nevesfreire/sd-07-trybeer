import { combineReducers } from 'redux';
import products from './products';
import order from './order';
import cart from './cart';

const rootReducer = combineReducers({
  products,
  order,
  cart,
});

export default rootReducer;
