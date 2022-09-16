const express = require("express");
const router = express.Router();

const { register, login, checkAuth } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');

const { 
    addUser,
    getUsers,
    updateUser,
    deleteUser
} = require('../controllers/user')

const {
    getTransactionById, 
    getTransactionByDate, 
    addTransaction,
} = require('../controllers/transaction')

router.post('/user', addUser);
router.get('/users', getUsers);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.get('/transactionid/:id', auth, getTransactionById)
router.get('/transactiondate/:id', auth, getTransactionByDate)
router.post('/transaction', auth, addTransaction)

router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", auth, checkAuth);

module.exports = router;