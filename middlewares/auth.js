const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const auth = (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token) {
            token = token.split(' ')[1];
            const user = jwt.verify(token, SECRET_KEY);
            req.userId = user.id;
        }
        else {
            res.status(401).json({ message: 'Unauthorized' });
        }

        next();
    } catch (err) {
        console.log(err);
        res.status(401).json({ message: 'Unauthorized' });
    }
}

module.exports = auth;