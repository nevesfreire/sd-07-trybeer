const Joi = require('@hapi/joi');

const userValidation = (object) => {
  const dataSchema = Joi.object({
    name: Joi.string().regex(/^[a-z ,.'-]+$/i).min(12).required(),
    email: Joi.string().email().required(),
    password: Joi.string().trim().min(6).max(20)
.required(),
    role: Joi.boolean().required(),
  }).messages({
    'string.email': 'Formato de e-mail inválido',
    'string.min': 'O campo {{ #label }} deve ter pelo menos {{ #limit }} caracteres',
    'string.max': 'O campo {{ #label }} deve ter no máximo {{ #limit }} caracteres',
    'boolean.base': 'Regra de usuário deve ser um "boolean"',
    'any.required': 'Campo {{ #label }} é obrigatório',
  });
  return dataSchema.validate(object);
};

module.exports = {
  userValidation,
};
