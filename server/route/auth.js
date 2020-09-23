const authRouter = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./verifyToken');

const { loginValidation, userValidation } = require('../validation');

authRouter.post('/Signup', async (req, res) => {
    const { error } = userValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const userExist = await User.findOne({ username: req.body.username });
        if (userExist) {
            return res.status(400).send('user already exist');
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        const user = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashPassword
        });
        const savedUser = await user.save();
        res.send("registered");
        res.end();
    } catch (e) {
        res.status(400).send(e);
    }

});

authRouter.post('/Login', async (req, res) => {
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).send('username or password is wrong');
        }

        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass) {
            return res.status(400).send('username or password is wrong');
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '30m'});
        res.header('auth-token', token).send('logged in');
        res.end();
    } catch (e) {
        res.status(400).send(e);
    }

});

authRouter.post('/ValidToken', auth, async (req, res) => {
    try {
        res.send(true);
        //res.end();
    }
    catch (e) {
        res.status(400).send(e);
    }
});

module.exports = authRouter;