const express = require("express");
const router = express.Router();

const { register, login, checkAuth } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
const { uploadFile } = require('../middlewares/uploadFile');

const { 
    addUser,
    getUsers,
    updateUser,
    deleteUser
} = require('../controllers/user')

const { 
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
    getProduct
} = require('../controllers/product')

router.post('/user', addUser);
router.get('/users', getUsers);
router.patch('/user/:id', updateUser);
router.delete('/user/:id', deleteUser);

router.post('/product', auth, uploadFile('image'), addProduct);
router.get('/products', auth, getProducts);
router.get('/product/:id', auth, getProduct);
router.patch('/product/:id', auth, uploadFile('image'), updateProduct);
router.delete('/product/:id', auth, deleteProduct);

router.post('/register', register);
router.post('/login', login);
router.get("/check-auth", auth, checkAuth);

module.exports = router;