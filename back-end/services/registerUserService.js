const User = require('../models/UserModel');

const validateFields = async(name,email, password)=>{

  if(validateName(name))return res.status(BAD_REQUEST).json(validateName);

  if(!validateEmail(email))return res.status(BAD_REQUEST).json(validateEmail);

  if(validatePassword(password))return res.status(BAD_REQUEST).json(validatePassword);

  if(await validateIfEmailExist(email))return res.status(BAD_REQUEST).json(validateIfEmailExist);
}
const  validateName= (name)=>{
  const reg = /[^a-zA-Z0-9]/;
  if (!name) return { message: 'O campo "name" é obrigatório' };
  if (name.length < 12) {
    return { message: 'O "name" deve ter pelo menos 12 caracteres' }; 
  }
  if (!reg.test(name)) return { message: 'O nome nao deve ter números ou caracteres especiais' };
} 

const  validateEmail = (email) =>{
  const reg = /\S+@\S+\.\S+/;
  if(!reg.test(email)) return { message: 'Email inválido' };
} 
const  validateIfEmailExist = async(email) =>{
  const result = await user.getByEmail(email);
  if(result) return { message: 'Já existe um usuário com esse e-mail.' };
} 
const  validatePassword = (password) => {
  const passwordParsed = password.toString();  
  const arrayPassword = passwordParsed.split('');
  if (arrayPassword.length < 6 ) return { message: 'Senha deve ter no mínimo 6 caracters' };  
}  


const registerUser = async(name, email, password, wantToSell)=>{
  let role = 'client';
  const message = validateFields(name, email, password);

  if(message) return message;

  if(wantToSell) role = 'admin';

  const { insertedId } = await User.registerUser(name,email,password,role);

  return{
    user:{
      name,
      email,
      role,
      _id:insertedId
    }
  }

}

module.exports = {
  registerUser
};