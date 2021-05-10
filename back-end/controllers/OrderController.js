// const OrderService = require('../services/OrderService');

// const serverError = 'server error';

// const getOrderById = async (req, res) => {
//   const { id } = req.params;
//   try {  
//   const result = await OrderService.getOrderById(id);
//   return res.status(result.status).json(result.message);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: serverError });
//   }  
// };

// module.exports = {
//   getOrderById,
// };
