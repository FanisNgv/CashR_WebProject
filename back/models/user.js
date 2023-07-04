const {Schema, model} = require('mongoose')


const User = new Schema({
    firstname:{type: String, unique: false, required: true},
    lastname:{type: String, unique: false, required: true},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    roles: [{type: String, ref: 'Role'}],
    balance: {type: Number, required: true}
})

module.exports = model('User', User)