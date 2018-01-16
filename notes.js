console.log("starting the notes")

const fs = require("fs");

const addNotes = (title,body) => {
    var notes = [];
    var note = {
        title,
        body
    }

    try{
        var notesString = fs.readFileSync("notes-data.json");
        notes = JSON.parse(notesString);
        //console.log(notes);
        for(item of notes){
            console.log(item.title);
        }
    } catch(e) {
        console.log(e);
    }
    //check if given note is duplicate
    var duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    //if given note is not duplicate(length===0) just add it to notes array
    if(duplicateNotes.length === 0){
        notes.push(note);
        fs.writeFileSync("notes-data.json",JSON.stringify(notes));
    }

    
}

const getAll = () => {
    console.log("showing all notes");
}

const getNotes = (title) => {
    console.log("Reading note of " ,title);
}

const removeNotes = (title) => {
    console.log("Removing note ", title);
}

const updateNotes = (title,body) => {
    console.log("Update the note ",title , " of ", body);
}

module.exports = {
    addNotes,
    getAll,
    getNotes,
    removeNotes,
    updateNotes,
}