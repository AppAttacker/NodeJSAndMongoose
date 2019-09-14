const mongoose = require('mongoose');

const NoteSchema = mongoose.Schema({
    title: String,
    
    content: {
        contentType: String,
        contentText: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Note',NoteSchema);