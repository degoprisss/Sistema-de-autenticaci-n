const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require('../models/users.models')

const login = async (req, res, next) => {
    try {

        let { email, password } = req.body
        let existsUsers = await UserModel.findOne({ email: email })

        if (existsUsers) {

            const cmp = await bcrypt.compare(password, existsUsers.password);

            if (cmp) {
                console.log('validando')
                const token = jwt.sign({ existsUsers }, 'Secret Password', {
                    algorithm: "HS512",
                    expiresIn: "1h"
                });

                res.status(200).json({ existsUsers, token });

            } else {
                res.status(401).json({ Error: "Wrong username or password." });
            }
        }
        else {
            res.status(401).json({ Error: "Wrong username or password." });
        }

    } catch (error) {
        next(error)
    }
}

module.exports = {
    login
};