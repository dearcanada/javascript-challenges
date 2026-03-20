import "../styles/index.css";

/* Console */
import { getProjects, removeGroup, removeNote, } from "./shared/processor.js";
import { createGroup } from "./group.js";
import { createNote } from "./note.js";

/* UI */ 
import { groupsNav, createGroupDOM  } from "./group-DOM.js";
import { groupsList } from "./groups-setings-helper.js";

createGroupDOM('default');

createNote({
  title: 'Shopping',
  description: 'Buy bread',
  dueDate:'21/02/25',
  priority: 'high',
  status: 'active',
}, 'default');

console.log(getProjects());
