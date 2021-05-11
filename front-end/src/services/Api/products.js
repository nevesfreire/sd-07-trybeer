const { instance } = require('./apiInstance');

const getAllProducts = async () => {
  try {
    const result = await instance.get('products');
    return result.data;
  } catch (error) {
    return ({ error: 'algo deu errado' });
  }
};

const sendProducts = async (tPrice, dAddress, dNumber) => {
  try {
    const result = await instance.post('checkout', { tPrice, dAddress, dNumber });
    return result;
  } catch (error) {
    return ({ error: 'não há produtos' });
  }
};

module.exports = {
  getAllProducts,
  sendProducts,
};
