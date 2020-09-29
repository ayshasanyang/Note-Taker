// Dependencies
const fs = require("fs");
var data = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));


module.exports = function(app) {

    // This GET method  request from API 
    app.get("/api/notes", function(req, res) {
        res.json(data);
    });

    // POST method route 
    app.post("/api/notes", function(req, res) {

        let newNote = req.body;
        let uniqueId = (data.length).toString();
        console.log(uniqueId);
        newNote.id = uniqueId;
        data.push(newNote);

        // This function will write the note into db.json
        fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
            if (err) throw (err);        
        });
        res.json(data);    
    });

    // This function deletes notes from the list 
    app.delete("/api/notes/:id", function(req, res) {

        let noteId = req.params.id;
        let newId = 0;
        console.log(`Deleting note with id ${noteId}`);
        data = data.filter(currentNote => {
           return currentNote.id != noteId;
        });
        for (currentNote of data) {
            currentNote.id = newId.toString();
            newId++;
        }
        fs.writeFileSync("./db/db.json", JSON.stringify(data));
        res.json(data);
    }); 

}