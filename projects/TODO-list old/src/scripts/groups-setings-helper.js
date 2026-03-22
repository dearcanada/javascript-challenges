import { groupsList } from "./shared/shared.js";
import { removeGroup, renameGroup } from "./shared/processor.js";

const groupSettingsModal = document.querySelector('#settings-modal-id');
const renameGroupModal = document.querySelector('#rename-modal-id');
let targetGroup = '';

groupsList.addEventListener('click', (event) => {
  const target = event.target;
  
  if (target.closest('[data-group-action-btn]')) {
    groupSettingsModal.showModal();
    targetGroup = target.closest('li.group');
  };
});

groupSettingsModal.addEventListener('click', (event) => {
  const target = event.target;
  const groupTitleSpan = targetGroup.querySelector('.group__title');

  if (target.id === 'btn-delete') {
    targetGroup.remove();
    removeGroup(groupTitleSpan.textContent);
    groupSettingsModal.close();
  };

  if (target.id === 'btn-change-name') {
    groupSettingsModal.close();
    renameGroupModal.showModal();  
  };

  if (target.closest('#close-settings-modal-btn')) {
    groupSettingsModal.close();
  };
});

renameGroupModal.addEventListener('click', (event) => {
  const target = event.target;
  
  const renameInput = document.querySelector('#rename-input-id');
  const renameInputValue = renameInput.value;

  const groupTitleSpan = targetGroup.querySelector('.group__title');

  if (target.id === 'rename-submit-btn') {
    if (!renameInputValue) return;
  
    renameGroup(groupTitleSpan.textContent, renameInputValue);
    groupTitleSpan.textContent = renameInputValue;
  };

  if (target.id === 'rename-cancel-btn') {
    renameGroupModal.close();
    groupSettingsModal.showModal();
  };
});