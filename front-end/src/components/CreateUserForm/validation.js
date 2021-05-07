const validateRegister = (name, email, password) => {
  const specialCharReg = /^[a-zA-Z\s]*$/;
  const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const NAME_MIN_LENGTH = 12;
  const PASSWORD_MIN_LENGTH = 6;

  if (!name || name.length < NAME_MIN_LENGTH || !specialCharReg.test(name)) {
    console.log('problema em name');
    return true;
  }
  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    console.log('problema em password');
    return true;
  }
  if (!email || !emailRegex.test(email)) {
    console.log('problema em email');
    return true;
  }
  return false;
};

export default validateRegister;
