const { instance } = require('./apiInstance');

const getAllProducts = async () => {
  try {
    const result = await instance.get('products');
    return result.data;
  } catch (error) {
    return { error: 'algo deu errado' };
  }
};

const sendProducts = async (body, token) => {
  try {
    const result = await instance.post('sale', body, {
      headers: {
        Authorization: token,
      },
    });
    return result;
  } catch (error) {
    return { error: 'não há produtos' };
  }
};

module.exports = {
  getAllProducts,
  sendProducts,
};
