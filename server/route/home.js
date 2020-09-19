const homeRouter = require('express').Router();
const auth = require('./verifyToken');

homeRouter.get('/', auth, (req, res) => {
    res.send('home');
    res.send(req.user);

});

module.exports = homeRouter;