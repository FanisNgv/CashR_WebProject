const Router = require('express');
const router = new Router();
const controller = require('../controllers/userController');
const {check} = require("express-validator");

router.post('/createTransaction', controller.createTransaction);
router.post('/getTransactions', controller.getTransactions);
module.exports = router;