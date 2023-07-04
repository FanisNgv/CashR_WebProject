const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {secret} = require("../config");
const config = require('../config.js');
const express = require("express");
const path = require("path")
const bodyParser = require('body-parser');

const User = require('../models/user');
const Role = require('../models/role');



const generateAccessToken = (id, roles) =>{
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn:"24h"});
}

class authController {
    async getUser(req, res){
        try{
            const authHeader = req.headers.authorization;
            const token = authHeader && authHeader.split(' ')[1];

            if (!token) {
                return res.sendStatus(401);
            }
            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) {
                    console.log(err); // Вывод информации об ошибке в консоль
                    return res.status(401).json({error: 'Unauthorized'});
                }
                const userId = decoded.id;
                const user = await User.findOne({_id: userId});

                if (!user) {
                    return res.status(404).json({error: 'User not found'});
                }
                res.json(user);
            });
        }
        catch(e){
            console.log(e);
            res.status(400).json({message:'Getting users error'});
        }
    }
    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors});
            }
            const {firstName, lastName, email, password} = req.body;
            const candidate = await User.findOne({email});
            if (candidate) {
                return res.status(400).json({message: 'Пользователь с таким именем уже существует'});
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const userRole = await Role.findOne({value:"User"});
            const user = new User({
                firstname: firstName,
                lastname: lastName,
                email: email,
                password: hashPassword,
                roles: userRole.value,
                balance: 0
            })
            await user.save();
            const obj = {
                isRegistered: true,
                message: "Регистрация прошла успешно!"
            };
            res.json(obj);
        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Registration error'});
        }
    }

    async login(req, res) {
        try {
            const {email, password} = req.body;
            const user = await User.findOne({email});
            if (!user) {
                return res.status(400).json({message: `Пользователь ${email} не найден!`});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль!`});
            }
            const token = generateAccessToken(user._id, user.roles)
            //res.cookie('token', token);
            const obj = {
                token: token,
                role: user.roles,
                message: "Авторизация успешна!"
            };
            return res.json(obj);

        } catch (e) {
            console.log(e);
            res.status(400).json({message: 'Login error'});
        }
    }
}



module.exports = new authController();