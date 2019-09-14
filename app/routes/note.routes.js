module.exports = (app)=>{
    const notesController = require('../controllers/note.controller.js');

    app.get('/notes', notesController.findAll);

    app.post('/notes', notesController.create);
    
    app.get('/notes/:contentType', notesController.findById);

    app.put('/notes/:noteId', notesController.update);

    app.delete("/notes/:noteId", notesController.delete);
}