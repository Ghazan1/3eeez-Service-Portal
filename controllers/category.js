const Category = require('../models/category');
const { validationResult } = require('express-validator');


//get all categories
exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        if (!categories) {
            res.status(400).json({ msg: "There is no categories" });
        }

        res.json(categories);

    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Internal server error" + error });
    }
}


//add category
exports.postCategory = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }


    const { name } = req.body;

    try {

        const newCategory = new Category({
            name
        });

        const category = await newCategory.save();

        res.json(category);

    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Internal server error" + error });
    }
}

//update category
exports.updateCategory = async (req, res) => {

    const errors = validationResult(req);
    if (!errors) {
        res.status(400).json({ errors: errors.array() });
    }

    try {

        let category = await Category.findOne({ _id: req.params.categoryId });

        if (!category) {
            return res.status(400).json({ msg: "Category Not Found" });
            console.log("Category Not Found");

        }

        category.name = req.body.name;

        const updatedCategory = await category.save();

        res.json(updatedCategory);

    } catch (error) {
        console.log(error);

        res.status(500).json({ error: "Internal server error" + error });
    }
}

//
exports.getCategory = async (req, res) => {
    const category_id = req.params.categoryId;

    try {
        const category = await Category.findOne({ _id: category_id });

        if (!category) {
            return res.status(400).json({ msg: "Category Not Found" });
        }

        res.json(category);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" + error });
    }
}