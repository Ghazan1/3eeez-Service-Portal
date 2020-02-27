const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category');
const { check } = require('express-validator');

router.get('/all', categoryController.getCategories);
router.get('/:categoryId', categoryController.getCategory)
router.post('/', [
    check("name", "name is required").not().isEmpty().isLength({ min: 3 })
], categoryController.postCategory);

router.put('/:categoryId', categoryController.updateCategory);

module.exports = router;