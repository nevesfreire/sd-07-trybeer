const fieldValidate = (name, email, password) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 6;
  const nameLength = 12;
  const result = regexEmail
    .test(email) && password.length >= passwordMinLength && name.length > nameLength;
  console.log('na func', result);
  return result;
};

export default fieldValidate;
