const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/database.js');
const Auth = require('./routes/auth.js');
const Post = require('./routes/post.js');
dotenv.config();  

const app = express();
app.use(cors());
app.use(express.json({limit: '30mb', extended: true}));
app.use(express.urlencoded({limit: '30mb', extended: true}));

app.use('/', Auth);
app.use('/', Post);

// app.get('/', (req, res) => {
//     res.json({message: 'Hello World!'});
//     });

const PORT = process.env.PORT || 3000;

db();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    });