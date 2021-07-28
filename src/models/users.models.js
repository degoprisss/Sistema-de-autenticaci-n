const mongoose = require('mongoose');

const schemaUser = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active: { type: Boolean, default: false },
})

const UserModel = mongoose.model('User', schemaUser)

module.exports = UserModel