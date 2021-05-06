
const saveToken = (token) => localStorage.setItem(
    'token', JSON.stringify(token),
  );
  
const getToken = () => JSON.parse(localStorage.getItem('token'));

export { 
  getToken,
  saveToken,
};