const Router = require('express');
const router = new Router();
const controller = require('../controllers/adminConroller');
const {check} = require("express-validator");

router.get('/users', controller.users);
router.post('/deleteUser', controller.deleteUser);
router.post('/getUser', controller.getUser);
router.put('/updateUser', controller.updateUser)

module.exports = router;