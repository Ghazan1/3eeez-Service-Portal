const config = require('config');
const jwt = require('jsonwebtoken');

const auth = function (req, res, next) {

    //get token from header
    const token = req.header('x-auth-header');

    //check token
    if (!token) return res.status(401).json({ msg: 'no token, authorization denied' });

    try {
        //verify the token
        const decoded = jwt.verify(token, config.get('mySecret'));

        //assign to user object
        req.admin = decoded.admin;
        next();

    } catch (error) {
        console.log('Server Error');
        res.status(401).json({ msg: 'Internal server Error' });
    }
}

module.exports = auth;