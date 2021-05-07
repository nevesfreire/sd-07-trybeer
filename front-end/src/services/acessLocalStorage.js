const setUserLocalStorage = (data) => localStorage.setItem('user', JSON.stringify(data));

const getUserLocalStorage = () => JSON.parse(localStorage.getItem('user'));

export default { setUserLocalStorage, getUserLocalStorage };
