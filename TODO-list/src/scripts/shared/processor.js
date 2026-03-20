import { projects } from "./shared.js";
import { log } from "./shared.js";
export { pushGroup, removeGroup, renameGroup, pushNote, removeNote, getProjects };

const pushGroup = (name, groupArray) => {
  if (projects[name]) {
    return log(`A group with "${name}" name already exists`);
  };
  
  projects[name] = groupArray;
};

const removeGroup = (name) => {
  delete projects[name];
};

const pushNote = (note, group) => {
  if (projects[group].find(element => element.title === note.title)) {
    return log(`A note with "${note.title}" title already exists`);
  };
  
  projects[group].push(note);
};

const removeNote = (note, group) => {
  const index = projects[group].findIndex(object => object.title === note);
  projects[group].splice(index, 1);  
};

const renameGroup = (oldName, newName) => {
  Object.defineProperty(projects, newName, {
    value: projects[oldName],
    configurable: true,
  });
  delete projects[oldName];
};

const getProjects = () => projects;

