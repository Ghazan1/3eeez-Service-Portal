const Admin = require('../models/admin');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const jwt = require('jsonwebtoken');
const config = require('config');
//get admin
exports.getAdmin = async (req, res) => {
    try {
        const admin = await Admin.findOne({ _id: req.admin.id }).select('-password');
        if (!admin) {
            return res.status(400).json({ msg: "Not Found" })
        }
        res.json(admin);

    } catch (err) {
        console.log(err);
        if (err) {
            res.status(500).json({ errors: err })
        }
    }
}

//reqgister new admin
exports.registerAdmin = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body;
    try {
        let admin = await Admin.findOne({ email });

        if (admin) {
            return res.status(400).json({ errors: [{ msg: 'user already exist' }] });
        }

        admin = new Admin({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10)
        admin.password = await bcrypt.hash(password, salt);

        await admin.save();

        const payload = {
            admin: {
                id: admin.id
            }
        };

        jwt.sign(payload,
            config.get('mySecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.json({ token })
            });
        // res.send('User registered')

    } catch (error) {
        console.log("internal server Error", error);
        if (error) {
            res.status(500).json({ errors: error })
        }
    }
}

//login route
exports.loginAdmin = async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;
    try {
        let admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
        }

        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
            return res.status(400).json({ errors: [{ msg: 'invalid credentials' }] });
        }

        const payload = {
            admin: {
                id: admin.id
            }
        };

        jwt.sign(payload,
            config.get('mySecret'),
            { expiresIn: 3600 },
            (err, token) => {
                if (err) throw err;

                res.json({ token })
            })

    } catch (error) {
        console.log("internal server Error", error);
        res.status(500).json({ errors: error });
    }
}