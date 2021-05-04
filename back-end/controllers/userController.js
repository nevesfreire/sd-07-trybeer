const userService = require('../services/userService');

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const data = await userService.createUser(name, email, password, role);
        res.status(201).json({
            data
        })
    } catch (error) {
        res.status(500).json({
            message: "We found an error"
        })
    }
};

const logUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const data = await userService.logUser(email, password);
        if (!data) {
 return res.status(401).json({
            message: 'Incorrect username or password',
        }); 
}
        return res.status(200).json({
            data,
        });
    } catch (error) {
        res.status(401).json(
            {
                message: "Incorrect email or password"
            }
        );
    }
};

const getUser = async (req, res) => {
    res.send('Ok');
};

module.exports = {
    createUser,
    logUser,
    getUser,
};
