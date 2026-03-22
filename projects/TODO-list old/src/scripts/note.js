import { pushNote } from "./shared/processor.js";

class Note {
  title;
  description;
  dueDate;
  priority;
  status;

  constructor({ title, description, dueDate, priority, status }) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = status;
  };
};  

export const createNote = (noteData, group) => {
  const note = new Note(noteData);
  pushNote(note, group);
};