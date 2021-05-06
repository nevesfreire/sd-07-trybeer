const Joi = require('joi');

const validateData = (data) =>
  Joi.object({
    productName: Joi.string().required(), 
    quantity: Joi.number().min(1).required(),
    totalPrice: Joi.number().min(1).precision(2).required(), 
    deliveryAddress: Joi.string().required(), 
    deliveryNumber: Joi.number(),
    status: Joi.string().valid('Pendente', 'Entregue'),
  }).validate(data);

module.exports = {
  validateData,
};