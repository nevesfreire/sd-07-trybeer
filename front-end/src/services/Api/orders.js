const { instance } = require('./apiInstance');

const getOrdersFromId = async (token) => {
  console.log(token);
  try {
    const result = await instance.get('orders',
      {
        headers: {
          authorization: token,
        },
      });
    return result.data;
  } catch (error) {
    console.log(error);
    return ({ error: 'Erro' });
  }
};

module.exports = {
  getOrdersFromId,
};
