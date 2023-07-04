const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require("../config");
const express = require("express");
const path = require("path")
const bodyParser = require('body-parser');

const User = require('../models/user');
const Role = require('../models/role');
const Transaction = require('../models/transaction')

class userController {
    async createTransaction(req,res){
        console.log(req.body)
        const userID = req.body.userID;
        const come = req.body.come;
        const valueOfTransaction = req.body.valueOfTransaction;
        const typeOfTransaction = req.body.typeOfTransaction.value;
        const dateOfTransaction = req.body.dateOfTransaction;

        const newTransaction = new Transaction({
            userID: userID,
            valueOfTransaction: valueOfTransaction,
            come: come,
            typeOfTransaction: typeOfTransaction,
            dateOfTransaction: dateOfTransaction
        });
        await newTransaction.save();

        const user = await User.findById(userID);
        const balance = { amount: user.balance };

        if (come === 'Income') {
            balance.amount += parseInt(valueOfTransaction);
        }
        else if(come ==='Outcome'){
            balance.amount += valueOfTransaction;
        }

        const result = await User.findOneAndUpdate({_id:userID}, { $set: {balance: balance.amount}});

        res.status(200).json({ message: 'Транзакция успешно создана!' });
    }
    async getTransactions(req,res){
        console.log(req.body)
        const userID = req.body.userID;
        const transactions = await Transaction.find({ userID: userID });
        console.log(transactions);
        res.status(200).json(transactions);
    }
}

module.exports = new userController();