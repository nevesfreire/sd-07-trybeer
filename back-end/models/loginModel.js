const connection = require('./connection');

// const getAll = async () => {
//   const result = await connection().then((db) =>
//     db.collection('users').find().toArray());
//   return result;
// };

// const getById = async (id) => {
//   if (!ObjectId.isValid(id)) return null;
//   const result = await connection().then((db) =>
//     db.collection('users').findOne(ObjectId(id)));
//   return result;
// };

const getByEmail = async (email) => {
  const [row] = await connection.execute("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return row;
};

// const postdata = async (name, email, password) => {
//   // console.log(name, email, password);
//   const role = 'user';
//   const user = await connection().then((db) =>
//     db.collection('users').insertOne({ name, email, password, role }));
//   return { _id: user.insertedId, name, email, role };
// };

// const postdataAdmin = async (name, email, password, role) => {
//   const user = await connection().then((db) =>
//     db.collection('users').insertOne({ name, email, password, role }));
//   return { _id: user.insertedId, name, email, role };
// };

// const editdata = async (objParams) => {
//   const { _id, name, email, password, role } = objParams;
//   await connection().then((db) =>
//     db
//       .collection('users')
//       .updateOne({ _id: ObjectId(_id) }, { $set: { name, email, password, role } }));
// };

// const deletedata = async (id) => {
//   await connection().then((db) =>
//     db.collection('users').deleteOne({ _id: ObjectId(id) }));
// };

module.exports = {
  getByEmail,
};