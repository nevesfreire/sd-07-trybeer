const fieldValidate = (name, email, password) => {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordMinLength = 6;
  const nameLength = 12;
  const result = regexEmail
    .test(email) && password.length >= passwordMinLength && name.length > nameLength;
  return result;
};

export default fieldValidate;
