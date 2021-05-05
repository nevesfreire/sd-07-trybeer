const registerService = require('../services/register');

const registerController = async (req, res) => {
   try {
        const { name, email, password, checked} = req.body;
        let role = 'admin';
        if (!checked) role = 'cliente'

        const user = await registerService.register(name, email, password, checked);
        console.log(user); 
        res.status(201).json({ name, email, password, role });
   } catch (error) {
       res.status(500).json({ messsage: error.messsage });
   }
};

module.exports = {
    registerController,
}