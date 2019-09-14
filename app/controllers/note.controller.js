const Note = require('../models/note.model.js');

exports.create = (req, res) =>{
    if(!req.body.content.type && !req.body.content.text){
        return res.status(400).send({
            message: "content should not be empty"
        })
    }

    const note = new Note({
        title: req.body.title || 'Untitle',
        
        content :{
            contentType: req.body.content.type,
            contentText: req.body.content.text
        }
    })

    note.save().then(data => {
        res.send(data)
    }).catch(err=>{
        res.status(500).send({
            message: err.message || "error occur while create note."
        })
    });
};

exports.findAll = (req, res) =>{

    Note.find().then(notes=>{
        res.send(notes);
    }).catch(err=>{
        err.status(500).send({
            message: err.message || "error on retrieve notes"
        })
    })
};

exports.findById = (req, res) =>{

    Note.find({'content.contentType':req.params.contentType}).then(note => {
        console.log(note);
        console.log(req.params.contentType);

        if(!note) {
            return res.status(404).send({
                message: "Note not found with type " + req.params.contentType
            });            
        }
        res.send(note);
    }).catch(err => {
        console.log("Error on retrieving note",err);
        return res.status(500).send({
            message: "Error retrieving note"
        })
    })

};

exports.update = (req, res) =>{

    Note.findByIdAndUpdate(req.params.noteId,{
        title : req.body.title || "Untitle",
        // content: req.body.content
        content :{
            contentType: req.body.content.contentType,
            contentText: req.body.content.contentText
        }
    },{new:true}).then(note=>{
        if(!note){
            return res.status(404).send({
                message: "Note not found with id "+req.params.noteId
            })
        }
        res.send(note);
    }).catch(err => {
        console.log(err);
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Error updating note with id " + req.params.noteId
        });
    });

};

exports.delete = (req, res) =>{

    Note.findByIdAndRemove(req.params.noteId).then(note => {
        if(!note) {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });
        }
        res.send({message: "Note deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Note not found with id " + req.params.noteId
            });                
        }
        return res.status(500).send({
            message: "Could not delete note with id " + req.params.noteId
        });
    });
};