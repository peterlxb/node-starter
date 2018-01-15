console.log("starting the notes")

const addNotes = (title,body) => {
    console.log("Adding note ", title, body);
}

const getAll = () => {
    console.log("showing all notes");
}

const readNotes = (title) => {
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
    readNotes,
    removeNotes,
    updateNotes,
}