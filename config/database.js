 const mongoose = require('mongoose');

 const db = () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to database");
    }).catch((err) => {
        console.log("Cannot connect to database: ", err);
    });
 }

 module.exports = db; 