const jwt = require("jsonwebtoken");

const verifyToken = ((req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        let tokenDivi = token.split(' ');
        let newtoken = [];
        tokenDivi.forEach(values => {
            if (values != "Bearer" && values != "/") {
                newtoken.push(values)
            }
        });
        tokenEnd = newtoken.join();
        console.log(tokenEnd);
        if (tokenEnd) {
            jwt.verify(tokenEnd, 'Secret Password', (err, decoded) => {
                if (err) {
                    return res.status(401).json({ mensaje: 'Token inválido' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(401).json({
                mensaje: 'Token no proporcionado.'
            });
        }
    } else {
        res.status(401).json({
            mensaje: 'Token no proporcionado.'
        });
    }

});


module.exports = { verifyToken };