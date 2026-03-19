import "../styles/index.css";

/* Console */
import { getProjects, removeGroup, removeNote, } from "./shared/processor.js";
import { createGroup } from "./note-group.js";
import { createNote } from "./note.js";

/* UI */ 
import { groupsNav, createGroupDOM  } from "./note-group-DOM.js";
import { groupsList } from "./groups-setings-helper.js";
console.log(getProjects);


createGroupDOM('default');

createNote({
  title: 'Shopping',
  description: 'Buy bread',
  dueDate:'21/02/25',
  priority: 'High',
}, 'default');

console.log(getProjects());
