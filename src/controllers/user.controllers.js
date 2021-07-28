const UserModel = require('../models/users.models')
const bcrypt = require('bcryptjs');

const saltRounds = 10;

let getUser = async (req, res, next) => {
    try {
        let id = req.params.id
        let getUser = await UserModel.findById(id)

        if (getUser.active == true) {
            res.status(201).json(getUser)
        } else {
            res.status(401).json({ Error: "El usuario no ha sido activado" })
        }
    } catch (error) {
        return next(error)
    }
}

let newUser = async (req, res, next) => {
    try {
        let { firstname, lastname, email } = req.body;

        const password = await bcrypt.hash(req.body.password, saltRounds);

        let newUser = await UserModel.create({ firstname, lastname, email, password })

        let id = newUser._id 
        res.status(201).json({id})

    } catch (error) {
        return next(error)
    }
}

let updateUser = async (req, res, next) => {
    try {
        let { firstname, lastname, email } = req.body;

        const password = await bcrypt.hash(req.body.password, saltRounds);

        let id = req.params.id

        let updateUser = await UserModel.update({ _id: id }, { firstname, lastname, email })

        res.status(201).json(updateUser)

    } catch (error) {
        return next(error)
    }
}

let activeAcount = async (req, res, next) => {
    try {
        let datosUpdate = {
            active: req.body.active
        }

        let id = req.params.id

        let updateUser = await UserModel.update({ _id: id }, datosUpdate)

        res.status(201).json(updateUser)

    } catch (error) {
        return next(error)
    }
}

let deleteUser = async (req, res, next) => {
    try {
        let id = req.params.id
        let delteUser = await UserModel.remove({ _id: id })
        res.status(201).json(delteUser)
    } catch (error) {
        return next(error)
    }
}

module.exports = { getUser, newUser, updateUser, deleteUser, activeAcount }