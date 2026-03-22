/* Console App Shared */ 
class Project {};

export const projects = new Project();

export const log = (message) => {
  console.log(`[${Date.now()}] Logger: [${message}].`);
};

/* DOM Shared */ 
export const groupsList = document.querySelector('#groups-id');
export const notesList = document.querySelector('#notes-id');
export const mainElement = document.querySelector('main');