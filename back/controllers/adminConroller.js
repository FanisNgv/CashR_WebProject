const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require("../config");
const express = require("express");
const path = require("path")
const bodyParser = require('body-parser');

const User = require('../models/user');
const Role = require('../models/role');

class adminController{
    async users(req, res){
        try {
            const users = await User.find({roles:"User"});
            return res.json(users);

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Getting users error'});
        }
    }

    async deleteUser(req, res){
        try {
            const userID = req.body.selectedUserID;
            await User.findOneAndDelete({_id:userID});
            const obj = {
                isDeleted: true,
                message: "Пользователь удален!"
            };
            return res.json(obj);

        } catch (e) {
            console.log(e);
            res.status(400).json({isDeleted: false, message: "Ошибка при удалении пользователя!"});
        }
    }
    async getUser(req, res){
        try {
            const userID = req.body.selectedUserID;
            const user = await User.findOne({_id:userID});
            const obj = {
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
            };
            return res.json(obj);

        } catch (e) {
            console.log(e);
            res.status(400).json({isDeleted: false, message: "Ошибка!"});
        }
    }
    async updateUser(req, res){
            try {
                const userID = req.body.id;
                const userFirstName = req.body.firstname;
                const userLastName = req.body.lastname;
                const userEmail = req.body.email;
                const result = await User.findOneAndUpdate({_id:userID}, { $set: {firstname:userFirstName, lastname:userLastName, email: userEmail}});
                const obj = {
                    message: "Пользователь изменен!"
                };
                return res.json(obj);

            }catch (e){
                console.log(e);
                res.status(400).json({message:'Project users getting error'});
            }
        }
}
module.exports = new adminController();