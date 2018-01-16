console.log("starting the notes")

const fs = require("fs");

var fetchNotes = () => {
    try{
        var notesString = fs.readFileSync("notes-data.json");
        return JSON.parse(notesString);
    } catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json",JSON.stringify(notes));
};

const addNotes = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    }
    //check if given note is duplicate
    var duplicateNotes = notes.filter((note) => {
        return note.title === title;
    });
    //if given note is not duplicate(length===0) just add it to notes array
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

const getAll = () => {
    var allNotes = fetchNotes();
    return allNotes;
}

const getNotes = (title) => {
    console.log("Reading note of " ,title);
}

const removeNotes = (title) => {
    console.log("Removing note ", title);

    var notes = fetchNotes(); // an array of node
    var filterNotes = notes.filter((note) => note.title !== title);
    saveNotes(filterNotes);

    return notes.length !== filterNotes.length;
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