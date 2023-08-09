const mongoose = require('mongoose');
const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content:{
        type: String,
        required: true,
        trim: true
    },
    date:{
        type: Date,
        default: new Date()
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'auth'
    },
    completed:{
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('post', PostSchema);
