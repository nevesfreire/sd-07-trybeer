const { instance } = require('./apiInstance');

const getAllProducts = async () => {
  try {
    const result = await instance.get('products');
    return result.data;
  } catch (error) {
    return ({ error: 'algo deu errado' });
  }
};

const sendProducts = async (cart) => {
  try {
    const result = await instance.post('checkout', { cart });
    return result;
  } catch (error) {
    return ({ error: 'não há produtos' });
  }
};

module.exports = {
  getAllProducts,
  sendProducts,
};
