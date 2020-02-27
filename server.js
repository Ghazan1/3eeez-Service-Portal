const express = require('express');
const dbInstance = require('./config/db');
const multer = require('multer');
const app = express();
const categoryRoute = require('./routes/category');
const productRoute = require('./routes/product');
const adminAuthRoute = require('./routes/auth');
const bodyparser = require('body-parser');
const path = require('path');

//connection with mongodb
dbInstance();


//uploading product image to server

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};


app.use(express.json({ extended: true }));

app.use(bodyparser.json());
app.use(
    multer({ storage: fileStorage, fileFilter: fileFilter }).single('image')
);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/admin/auth', adminAuthRoute)
app.use('/api/admin/category', categoryRoute)
app.use('/api/admin/product', productRoute)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
})
