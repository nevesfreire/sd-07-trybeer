const headers = { 'Content-Type': 'application/json' };

export async function fetchUser(email, password) {
  const response = await fetch('http://localhost:3001/login', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers,
  });
  const user = await response.json();
  return user;
}

export async function fetchRegisterNewUser({ name, password, email, role }) {
  const response = await fetch('http://localhost:3001/user', {
    method: 'POST',
    body: JSON.stringify({
      name, password, email, role,
    }),
    headers,
  });

  // 201 success
  // 401 erro
  // 409 email usado;
  return response;
}

export async function fetchUpdateUser(name, email) {
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const response = await fetch('http://localhost:3001/user', {
    method: 'PUT',
    body: JSON.stringify({ name, email }),
    headers: { ...headers, Authorization: loggedUser.token },
  });
  const user = await response.json();
  return user;
}

export async function fetchProductList() {
  const response = await fetch('http://localhost:3001/products', {
    method: 'GET',
    headers,
  });
  const list = await response.json();
  return list;
}

export async function fetchOrders() {
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const response = await fetch('http://localhost:3001/sales', {
    method: 'GET',
    headers: { ...headers, Authorization: loggedUser.token },
  });
  const orders = await response.json();
  return orders;
}

export async function fetchOrderById(id) {
  const loggedUser = JSON.parse(localStorage.getItem('user'));
  const response = await fetch(`http://localhost:3001/sales/${id}`, {
    method: 'GET',
    headers: { ...headers, Authorization: loggedUser.token },
  });
  const order = await response.json();
  return order;
}

export async function fetchFinishSale(cartList, address, totalPrice) {
  const loggedUser = JSON.parse(localStorage.getItem('user'));

  await fetch('http://localhost:3001/sales', {
    method: 'POST',
    body: JSON.stringify({
      products: cartList, address, totalPrice,
    }),
    headers: { ...headers, Authorization: loggedUser.token },
  });
  return true;
}

export async function updateOrderById(id) {
  const loggedUser = JSON.parse(localStorage.getItem('user'));

  await fetch(`http://localhost:3001/sales/${id}`, {
    method: 'PUT',
    headers: { ...headers, Authorization: loggedUser.token },
  });
  return true;
}
