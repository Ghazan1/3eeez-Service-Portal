const mongoose = require('mongoose');
const { validationResult } = require('express-validator');
const fileHelper = require('../util/fileHelper');
const Product = require('../models/product');


//get all products
exports.getProducts = async (req, res) => {
    try {

        const products = await Product.find();

        if (!products) {
            return res.status(400).json({ error: "There is no products " });
        }

        res.json(products);
    } catch (err) {
        console.log("Internal Server Error ");

        if (err) {
            res.status(500).json({ error: err })
        }
    }
}


//get single product
exports.getProduct = async (req, res) => {
    const productId = req.params.productId;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(400).json({ error: "Product not found!" });
        }

        res.json(product);

    } catch (err) {
        console.log("Internal Server Error ");

        if (err) {
            res.status(500).json({ error: err })
        }
    }
}

//add product
exports.postProduct = async (req, res) => {
    const title = req.body.title;
    const image = req.file;
    const price = req.body.price;
    const description = req.body.description;
    const category = req.body.category;

    if (!image) {
        return res.status(422).json({ error: "Image is not provided" });
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const imageUrl = image.path;

    const product = new Product({
        title: title,
        category: category,
        description: description,
        imageUrl: imageUrl,
        price: price
    });

    try {
        const addedProduct = await product.save();

        res.json(addedProduct);

    } catch (err) {
        console.log("Internal Server Error ", err);

        if (err) {
            res.status(500).json({ error: err })
        }
    }
}

//update product
exports.updateProduct = async (req, res) => {
    const prodId = req.params.productId;
    const updatedTitle = req.body.title;
    const updatedDesc = req.body.description;
    const updatedCategory = req.body.category;
    const image = req.file;
    const updatedPrice = req.body.price;

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
    }

    const imageUrl = image.path;

    try {
        const product = await Product.findById(prodId);

        if (!product) {
            res.status(400).json({ msg: "No Product with this id" });
        }

        product.title = updatedTitle;
        product.description = updatedDesc;
        product.category = updatedCategory;
        product.price = updatedPrice;

        if (image) {
            fileHelper.deleteFile(product.imageUrl);
            product.imageUrl = imageUrl;
        }

        const updatedProduct = await product.save();

        res.json(updatedProduct);

    } catch (error) {
        console.log("Internal Server Error ");

        if (err) {
            res.status(500).json({ error: err })
        }
    }
}

//delete product
exports.deleteProduct = async (req, res) => {

    const prodId = req.params.productId;

    try {
        const product = await Product.findById(prodId);
        if (!product) {
            return res.status(400).json({ msg: "No product for deletion " });
        }

        fileHelper.deleteFile(product.imageUrl);

        await product.deleteOne({ _id: prodId });

        res.json({ msg: "Deleted Successfully." })

    } catch (err) {
        console.log("Internal Server Error ");

        if (err) {
            res.status(500).json({ error: err })
        }
    }

}