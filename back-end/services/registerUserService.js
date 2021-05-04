const User = require('../models/UserModel');

// const EmailAlreadyExists = {
//   message: 'Já existe um usuário com esse e-mail.',
// };
// const validateName = (name) => {
//   const reg = /^[a-z\s]+$/i;
//   if (!name) return { message: 'O campo name é obrigatório' };
//   if (name.length < 12) {
//     return { message: 'O name deve ter pelo menos 12 caracteres' }; 
//   }
//   if (!reg.test(name)) {
//     return { message: 'O nome nao deve ter números ou caracteres especiais' };
//   } 
// }; 

// const validateEmail = (email) => {
//   const reg = /\S+@\S+\.\S+/;
//   if (!reg.test(email)) return { message: 'Email inválido' };
// }; 
// const validateIfEmailExist = async (email) => {
//   const result = await User.getByEmail(email);
//   if (result !== null) return EmailAlreadyExists;
// }; 
// const validatePassword = (password) => {
//   const passwordParsed = password.toString();    
//   const arrayPassword = passwordParsed.split('');
//   if (arrayPassword.length < 6) return { message: 'Senha deve ter no mínimo 6 caracters' };  
// };  
// const validateFields = async (name, email, password) => {
//   const result = await validateIfEmailExist(email);
//   if (validateName(name)) {
//     return validateName(name);
//   } 

//   if (!validateEmail(email)) return validateEmail(email);

//   if (validatePassword(password)) return validatePassword(password);

//   if (result.message) {
//     return EmailAlreadyExists;  
//   } 
// };
const registerUser = async (name, email, password, wantToSell) => {
  let role = 'client';
  // const message = await validateFields(name, email, password);
  // if (message) return message;

  if (wantToSell) role = 'admin';

  const { insertedId } = await User.registerUser(name, email, password, role);

  return {
    user: {
      name,
      email,
      role,
      _id: insertedId,
    },
  };
};

module.exports = {
  registerUser,
};