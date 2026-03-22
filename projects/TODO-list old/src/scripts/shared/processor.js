import { projects } from "./shared.js";
import { log, mainElement } from "./shared.js";
export { pushGroup, removeGroup, renameGroup, pushNote, removeNote, getProjects, updateLocalJSON, clearLocalData, clearMainElement};

localStorage.setItem('projects', '');

const pushGroup = (name, groupArray) => {
  if (projects[name]) {
    return log(`A group with "${name}" name already exists`);
  };
  
  projects[name] = groupArray;
  updateLocalJSON ();
};

const removeGroup = (name) => {
  delete projects[name];
  updateLocalJSON();
};

const pushNote = (note, group) => {
  if (projects[group].find(element => element.title === note.title)) {
    return log(`A note with "${note.title}" title already exists`);
  };
  
  projects[group].push(note);
  updateLocalJSON ()
};

const removeNote = (note, group) => {
  const index = projects[group].findIndex(object => object.title === note);
  projects[group].splice(index, 1);  
};

const renameGroup = (oldName, newName) => {
  Object.defineProperty(projects, newName, {
    value: projects[oldName],
    configurable: true,
    enumerable: true,
  });

  delete projects[oldName];
  updateLocalJSON();
};

const getProjects = () => projects;

const updateLocalJSON = () => {
  localStorage.setItem('projects', JSON.stringify(projects));
};

const clearLocalData = () => { localStorage.clear() };

const clearMainElement = () => [...mainElement.children].forEach((element) => element.remove());