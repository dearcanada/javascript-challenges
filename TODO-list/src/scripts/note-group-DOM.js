import { groupsList } from "./shared/shared.js";
import { createGroup } from "./note-group.js";
import { getProjects } from "./shared/processor.js";
export { groupsNav, createGroupDOM, };

const groupsNav = document.querySelector('#main-nav-id');
const setupModal = document.querySelector('#group-setup-id');
const setupModalInput = document.querySelector('#group-name-id');


groupsNav.addEventListener('click', (event) => {
  const target = event.target;

  if (target.id === 'btn-groups') {

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
  
function createGroupDOM(groupTitle) {
  if (!groupTitle) return;
  if (getProjects()[groupTitle]) return;

  const newGroup = document.createElement('li');
  
  newGroup.classList.add('groups__item')
  newGroup.innerHTML = `
    <span class="groups__title">${groupTitle}</span>
    <button class="btn groups__btn--group-action" data-group-action-btn="1">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10">
        <circle r="0.5" cx="5" cy="2.1" stroke="white" fill="white"></circle>
        <circle r="0.5" cx="5" cy="5.1" stroke="white" fill="white"></circle>
        <circle r="0.5" cx="5" cy="8.1" stroke="white" fill="white"></circle>
      </svg> 
    </button>`;
    
  groupsList.appendChild(newGroup);     
  createGroup(groupTitle);
};
