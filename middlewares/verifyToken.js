// imports
const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models/user');

exports.verifyUserToken = async (req, res, next) => {
    const bearerToken = req.headers['authorization'];
    // check if bearer is undefined
    if (typeof bearerToken !== 'undefined') {
        try {
            let user = verifyToken(bearerToken);
            const dbUser = await User.findOne({ email: user.email });
            if (dbUser) {
                user = dbUser;
            } else { return res.status(403).json({ message: 'User does not exist for this token' }) }
            req.body = {
                ...req.body,
                requestFrom: user
            }
            return next();
        } catch (e) {
            console.log(e.message);
            return res.status(403).json({ message: 'Invalid token.' })
        }
    } else {
        return res.status(403).json({ message: 'Forbidden request.' })
    }
}