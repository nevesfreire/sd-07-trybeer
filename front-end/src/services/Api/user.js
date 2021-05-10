const { instance } = require('./apiInstance');

const registerUser = async (name, email, role, password) => {
  try {
    const result = await instance.post('user', { name, email, role, password });
    return result;
  } catch (error) {
    return ({ error: 'usuário existe ou algo assim' });
  }
};

const loginUser = async (email, password) => {
  const result = await instance.post('login', { email, password });
  return result.data;
};

const updateUserName = async (newName, token) => {
  try {
    const result = await instance.post('updateUserName', { name: newName },
      {
        headers: {
          Authorization: token,
        },
      });
    return result;
  } catch (error) {
    return ({ error: 'usuário existe ou algo assim' });
  }
};

const getDetailOrders = async (orderId) => {
  try {
    const result = await instance.get('orders/:numeroDoPedido', orderId);
      // {
      //   headers: {
      //     Authorization: token,
      //   },
      // });
    return result;
  } catch (error) {
    return ({ error: 'pedido não encontrado' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserName,
  getDetailOrders,
};
