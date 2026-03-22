import { groupsList, mainElement } from "./shared/shared.js";
import { createGroup } from "./group.js";
import { getProjects, clearMainElement } from "./shared/processor.js";
import { renderGroupNotes } from "./note-DOM.js";

export { groupsNav, createGroupDOM, };

const groupsNav = document.querySelector('#component__nav-id');
const setupModal = document.querySelector('#group-setup-id');
const setupModalInput = document.querySelector('#group-name-id');

groupsNav.addEventListener('click', (event) => {
  const target = event.target;

  if (target.id === 'btn-groups') {
    if (mainElement.children[0].id === 'groups-id') return;
    
    clearMainElement();
    mainElement.appendChild(groupsList);
  };
  
  if (target.id === 'btn-new') {
    setupModal.showModal()
  };
});

setupModal.addEventListener('click', (event) => {
  const target = event.target;
  const inputValue = setupModalInput.value;

  
  if (target.id === 'btn-setup-submit') {    
    createGroupDOM(inputValue);
  };
    
    if (target.id === 'btn-setup-cancel') {
      setupModal.close();
    };
  });
  
const createGroupDOM = (groupTitle) => {
  if (!groupTitle) return;
  if (getProjects()[groupTitle]) return;

  const newGroup = document.createElement('li');
  
  newGroup.classList.add('group');
  newGroup.innerHTML = `
    <span class="group__title">${groupTitle}</span>
    <button class="btn group__btn--group-action" data-forTab="">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <circle r="0.5" cx="5" cy="2.1" stroke="white" fill="white"></circle>
        <circle r="0.5" cx="5" cy="5.1" stroke="white" fill="white"></circle>
        <circle r="0.5" cx="5" cy="8.1" stroke="white" fill="white"></circle>
      </svg> 
    </button>`;

  newGroup.addEventListener('click', (event) => renderGroupNotes(event, newGroup));

  groupsList.appendChild(newGroup);     
  createGroup(groupTitle);
};