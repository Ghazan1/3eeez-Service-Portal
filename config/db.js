const mongoose = require('mongoose');

const config = require('config');
const dbUri = config.get('mongoUrl');

const dbInstance = async () => {
    try {

        await mongoose.connect(dbUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

    } catch (error) {
        console.log(error);

    }
}

module.exports = dbInstance;