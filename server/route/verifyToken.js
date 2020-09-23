const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('auth-token');
    
    if (!token) {
        res.status('401').send('Access Denied');
    }
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();

    } catch (e) {
        res.status('401').send('Invalid Token');
    }

}

module.exports = auth;