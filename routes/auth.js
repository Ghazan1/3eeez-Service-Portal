const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const Admin = require('../models/admin');
const authController = require('../controllers/auth');
const { check } = require('express-validator/check');

router.get('/', auth, authController.getAdmin);

router.post('/', [
    check('name', 'name is required')
        .not()
        .isEmpty(),
    check('email', 'email is not valid')
        .custom((value, { req }) => {
            return Admin.findOne({ email: value }).then(adminDoc => {
                if (adminDoc) {
                    return Promise.reject(
                        'E-Mail exists already, please pick a different one.'
                    );
                }
            });
        })
        .isEmail()
        .normalizeEmail(),
    check('password', 'password would atleast 6 charecters')
        .isLength({ min: 6 })
        .isAlphanumeric()
        .trim()
], authController.registerAdmin);

router.post('/login', [
    check('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
    check('password', 'Password has to be valid.')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
], authController.loginAdmin);


module.exports = router;