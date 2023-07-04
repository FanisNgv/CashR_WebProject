const {Schema, model, Types} = require('mongoose')


const Transaction = new Schema({
    userID:{type: Types.ObjectId, required: true},
    come:{type: String, required:true},
    valueOfTransaction:{type: Number, required: true},
    typeOfTransaction:{type: String, required:true},
    dateOfTransaction:{type: Date, required:true}
})

module.exports = model('Transaction', Transaction)