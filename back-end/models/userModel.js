const connection = require('../connection');

const createUser = async (name, email, password, role) => {
    try {
    await connection
            .execute(`INSERT INTO 
            Trybeer.users (name, email, password, role) VALUES 
            (?,?,?,?)`, [name, email, password, role]);
    return {
        name,
        email,
        role,
    };
    } catch (error) {
        console.log(error);
    }
};

const logUser = async (email, password) => {
    const [data] = await connection
    .execute(`SELECT name, email, password, role 
    FROM Trybeer.users 
    WHERE email = ? AND password = ?`, [email, password]);
    if (!data) return null;
 return {
        name: data[0].name,
        email: data[0].email,
        role: data[0].role,
    }; 
};

const getUser = (data) => data;

module.exports = {
    createUser,
    logUser,
    getUser,
};