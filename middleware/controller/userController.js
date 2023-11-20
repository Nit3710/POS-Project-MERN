const userModel = require('../models/userModel');
//login user
const loginController = async (req, res) => {
    try {
        const { userId, password } = req.body;
        const user = await userModel.findOne({ userId, password, verified: true });
        if (user) {

            res.status(200).send('login sucessfully');
        } else {
            res.json({
                message: 'login failed',
                user,
            })
        }
    } catch (error) {
        console.log(error);
        process.exit(1);
    }

};
//register user
const registerController = async (req, res) => {
    try {
        const newUser = new userModel({ ...req.body, verified: true });
        await newUser.save();
        res.status(201).send({
            message: 'Register successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(400).send({
            error: 'something went wrong'
        })

    }
}

module.exports = { loginController, registerController };