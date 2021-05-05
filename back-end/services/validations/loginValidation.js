const Joi = require('@hapi/joi');

const loginValidation = (object) => {
  const minPasswordLength = 6;
  const dataSchema = Joi.object({
    email: Joi.string().email().required(),
    // 15098
    // password: Joi.string().number().min(100000).required(),
    password: Joi.string().trim().regex(/[0-9]/).min(6).max(15),
    // password: Joi.number().integer().min(6).max(20).required(),
  }).messages({
    'string.email': 'Formato de e-mail inválido',
    'string.regex': 'Senha deve conter somente números',
    'string.min': 'A senha deve ter pelo menos {{ #limit }} números',
    'number.min': '{{ #label }} must be larger than or equal to {{ #limit }}',
    'any.required': 'Campo {{ #label }} é obrigatório',
  });
  return dataSchema.validate(object);
};

module.exports = {
  loginValidation,
};
