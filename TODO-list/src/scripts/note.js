import { pushNote } from "./shared/processor.js";

class Note {
  title;
  description;
  dueDate;
  priority;

  constructor({ title, description, dueDate, priority }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  };
};  

export const createNote = (noteData, group) => {
  const note = new Note(noteData);
  console.log(note);
  
  pushNote(note, group);
  
};
