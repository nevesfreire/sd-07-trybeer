const emailAndPasswordValidation = (email, password) => {
  const emailRegex = /\S+@\S+\.\S+/;
  const passwordMinLength = 6;

  return emailRegex.test(email) && password.length >= passwordMinLength;
};

const nameValidation = (name) => {
  const nameRegex = /^[a-zA-Z\s\-\,]{11,}.\*?$/;
  return nameRegex.test(name);
}

export {
  emailAndPasswordValidation,
  nameValidation,
}
