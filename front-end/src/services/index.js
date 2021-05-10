import validEmail from './validEmail';
import validPassword from './validPassword';
import validName from './validName';
import acessLocalStorage from './acessLocalStorage';

const {
  getUserLocalStorage,
  setUserLocalStorage,
} = acessLocalStorage;

export default {
  validEmail,
  validPassword,
  validName,
  getUserLocalStorage,
  setUserLocalStorage,
};
