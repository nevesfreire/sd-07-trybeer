const frisby = require('frisby');
const connection = require('./connection');
const script = require('../../script.sql');

descrbie ('POST into login route', async () => {
  beforeEach(async () => {
    const scriptRes = await connection.execute(script);
    console.log(scriptRes);
  })
  await frisby
    .post('http://api.example.com/posts')
    .expect('status', 200);
});