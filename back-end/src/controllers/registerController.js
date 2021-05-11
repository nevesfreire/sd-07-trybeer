const registerService = require('../services/register');

const getUser = async (req, res) => {
    const { email } = req.body;
    console.log(email);
    const user = await registerService.getUser(email);
    res.status(200).json({ user });
};

const registerController = async (req, res) => {
   try {
        const { name, email, password, checked } = req.body;
        let role = 'administrator';
        console.log('no back:', checked);
        if (!checked) role = 'client';

        const user = await registerService.register(name, email, password, checked);
        
        if (!user.code) {
           return res.status(201).json({ name, email, password, role });
        }

        res.status(user.code).json({ message: user.message });
   } catch (error) {
       res.status(500).json({ messsage: error.messsage });
   }
};

module.exports = {
    registerController,
    getUser,
};