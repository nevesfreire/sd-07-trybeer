const { instance } = require('./apiInstance');

const getAllProducts = async () => {
  try {
    const result = await instance.get('products');
    return result.data;
  } catch (error) {
    return ({ error: 'algo deu errado' });
  }
};

module.exports = {
  getAllProducts,
};
