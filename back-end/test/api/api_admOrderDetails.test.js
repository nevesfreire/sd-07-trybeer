const frisby = require('frisby');

const connection = require('./tstHelper/connection');

Date.prototype.addTime = function (time) {
  var time = time.split(":")
  var rd = new Date(this.setHours(this.getHours() + parseInt(time[0])))
  rd = new Date(rd.setMinutes(rd.getMinutes() + parseInt(time[1])))
  return new Date(rd.setSeconds(rd.getSeconds() + parseInt(time[2])))
}

describe('GET adm orders details', () => {
  const USERS = [{
    name: 'Pedro Risso',
    email: 'prisso@gmail.com',
    password: '1234567',
    role: 'administrator',
  },{
    name: 'Risso Pedro',
    email: 'rissop@risso.com',
    password: '1234567',
    role: 'client',
  },{
    name: 'Pedrobth',
    email: 'pedrobth@github.com',
    password: '1234567',
    role: 'client',
  }];
  // const date = new Date(Date());
  // const sale_date = JSON.stringify(date);
  const date = new Date();
  const sale_date = `${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}`;
  console.log(sale_date)
  const ORDERS = [{
    id: 1,
    user_id: 1,
    total_price: '119.00',
    delivery_address: 'Av. Atlantica',
    delivery_number: '2',
    sale_date,
    status: 'pendente',
  },{
    id: 2,
    user_id: 2,
    total_price: '829.3',
    delivery_address: 'Av. Vieira Souto',
    delivery_number: '456',
    sale_date,
    status: 'pendente',
  }];
  const URL = 'http://localhost:3001/admin/orders/2';
  const LOGIN_URL = 'http://localhost:3001/login';
  beforeEach(async (done) => {
    await connection.execute('DELETE FROM sales_products');
    await connection.execute('DELETE FROM sales');
    await connection.execute('DELETE FROM users');
    await connection.execute('DELETE FROM products');
    await connection.execute('ALTER TABLE sales_products AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE sales AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
    await connection.execute('ALTER TABLE products AUTO_INCREMENT = 1');
    await connection.execute('INSERT INTO users (name,email,password,role)'
        + 'VALUES (?,?,?,?),(?,?,?,?),(?,?,?,?)', [
          USERS[0].name, USERS[0].email, USERS[0].password, USERS[0].role,
          USERS[1].name, USERS[1].email, USERS[1].password, USERS[1].role,
          USERS[2].name, USERS[2].email, USERS[2].password, USERS[2].role,
        ])
    await connection.execute('INSERT INTO sales (user_id, total_price, delivery_address, delivery_number, sale_date, status)'
        + 'VALUES(?, ?, ?, ?, ?, ?),(?, ?, ?, ?, ?, ?)', [
          ORDERS[0].user_id,
          ORDERS[0].total_price,
          ORDERS[0].delivery_address,
          ORDERS[0].delivery_number,
          sale_date,
          ORDERS[0].stauts,
          ORDERS[1].user_id,
          ORDERS[1].total_price,
          ORDERS[1].delivery_address,
          ORDERS[1].delivery_number,
          sale_date,
          ORDERS[1].stauts,
        ])
    await connection.execute('INSERT INTO products (id, name, price, url_image) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)',
        ['1', 'Skol Lata 250ml', '2.20', 'http://localhost:3001/images/Skol Lata 350ml.jpg',
        '2', 'Heineken 600ml', '7.50', 'http://localhost:3001/images/Heineken 600ml.jpg',
        '3', 'Antarctica Pilsen 300ml', '2.49', 'http://localhost:3001/images/Antarctica Pilsen 300ml.jpg',
        '4', 'Brahma 600ml', '7.50', 'http://localhost:3001/images/Brahma 600ml.jpg']);
    await connection.execute('INSERT INTO sales_products (sale_id,product_id,quantity)'
        + 'VALUES(?,?,?),(?,?,?)(?,?,?),(?,?,?)(?,?,?),(?,?,?)', [
          1, 2, 10, //75
          1, 1, 20, //44 -> 119
          2, 1, 10, //22
          2, 2, 100, //750
          2, 3, 20, //49.8
          2, 4, 1, // 7.5 -> 829.3
        ])
    done();
  })

  // afterEach(async (done) => {
  //     await connection.execute('DELETE FROM sales_products');
  //     await connection.execute('ALTER TABLE sales_products AUTO_INCREMENT = 1');
  //     await connection.execute('DELETE FROM sales');
  //     await connection.execute('ALTER TABLE sales AUTO_INCREMENT = 1');
  //     await connection.execute('DELETE FROM products');
  //     await connection.execute('ALTER TABLE products AUTO_INCREMENT = 1');
  //     await connection.execute('DELETE FROM users');
  //     await connection.execute('ALTER TABLE users AUTO_INCREMENT = 1');
  //     done();
  // })

  afterAll(async done => {
      connection.end();
      done();
      });

  it('check the returned values', async () =>{
    const loginRes = await frisby.post(LOGIN_URL, {email: USERS[0].email, password: USERS[0].password})
    const { token } = loginRes.json.message;
    await frisby.setup({
      request: {
        headers: {
            Authorization: token,
        },
      }
    }).get(URL).expect('status', 200)
      .then(resp => {
        console.log(resp)
        const { json } = resp;
        json.message.foreach((item, index) => {
          expect(`\"${item.sale_date}\"`).toBe(ORDERS[index].sale_date)
          expect(item.id).toBe(ORDERS[index].id)
          expect(item.user_id).toBe(ORDERS[index].user_id)
          expect(item.total_price).toBe(ORDERS[index].total_price)
          expect(item.delivery_address).toBe(ORDERS[index].delivery_address)
          expect(item.delivery_number).toBe(ORDERS[index].delivery_number)
          expect(item.status).toBe(ORDERS[index].status)
        })
      })
  })
})
