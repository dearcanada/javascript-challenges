import { groupsList } from "./shared/shared.js";
import { removeGroup } from "./shared/processor.js";

const groupSettingsModal = document.querySelector('#settings-modal-id');

let targetGroup = '';

groupsList.addEventListener('click', (event) => {
  const target = event.target;
  

  if (target.closest('[data-group-action-btn]')) {
    groupSettingsModal.showModal();
    targetGroup = target.closest('li.groups__item');
  };
});

groupSettingsModal.addEventListener('click', (event) => {
  const target = event.target;
  const targetGroupTitleSpan = targetGroup.querySelector('.groups__title');

  if (target.id === 'btn-delete') {
    
    targetGroup.remove();
    removeGroup(targetGroupTitleSpan.textContent);
    
    groupSettingsModal.close();
  };

  if (target.id === 'btn-rename') {
  };
});