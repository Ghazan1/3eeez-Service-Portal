const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const productController = require('../controllers/product');


router.get('/all', productController.getProducts);

router.get('/:productId', productController.getProduct);

router.post('/', [
    check('title', 'title is required')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    check('description', 'description is required')
        .isLength({ min: 5, max: 400 })
        .trim(),
    check('category', 'category is required')
        .not()
        .isEmpty(),
    check('price', 'price is required').isFloat()
], productController.postProduct);

router.put('/:productId',[
    check('title', 'title is required')
        .isString()
        .isLength({ min: 3 })
        .trim(),
    check('description', 'description is required')
        .isLength({ min: 5, max: 400 })
        .trim(),
    check('category', 'category is required')
        .not()
        .isEmpty(),
    check('price', 'price is required').isFloat()
] ,productController.updateProduct);

router.delete('/:productId', productController.deleteProduct);

module.exports = router;