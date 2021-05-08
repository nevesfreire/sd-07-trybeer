import { getProducts } from '../services/Products';

export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const REQUEST_PRODUCTS = 'REQUEST_PRODUCTS';
export const REQUEST_PRODUCTS_SUCCESS = 'REQUEST_PRODUCTS_SUCCESS';
export const REQUEST_PRODUCTS_FAIL = 'REQUEST_PRODUCTS_FAIL';

export const update = (cart) => ({
  type: UPDATE_QUANTITY,
  cart,
});

export const requestProducts = () => ({
  type: REQUEST_PRODUCTS,
});

export const requestProductsSuccess = (products) => ({
  type: REQUEST_PRODUCTS_SUCCESS,
  products,
});

export const requestProductsFail = (error) => ({
  type: REQUEST_PRODUCTS_FAIL,
  error,
});

export function fetchProducts() {
  return async (dispatch) => {
    try {
      dispatch(requestProducts());
      const products = await getProducts();
      dispatch(requestProductsSuccess(products));
    } catch (error) {
      dispatch(requestProductsFail(error));
    }
  };
}
