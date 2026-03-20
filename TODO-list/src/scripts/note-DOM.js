import { mainElement } from "./shared/shared.js";

export { renderGroupNotes };

const renderGroupNotes = (targetGroup) => {
  console.log(targetGroup);
  mainElement.innerHTML = `
    <ul class="notes" id="notes-id">
      <li class="note">
        <div class="note-meta-wrapper">
          <span class="note__title">Weekend Shopping Plans</span>
          <span class="note__priority">Priority: <span>High</span></span>
          <span class="note__status">Status: <span>Active</span></span>
          <span class="note__creation-date">Created: <span>12/11/26</span></span>
          <span class="note__due-date">Due date: <span>72h left</span></span>
        </div>
        <div class="note-actions-wrapper">
          <div class="note__icon note__done">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
              <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/>
            </svg>
          </div>
          <div class="note__icon note__edit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22">
              <path d="M16 2H17V3H18V4H19V5H20V6H19V7H18V8H17V7H16V6H15V5H14V4H15V3H16M12 6H14V7H15V8H16V10H15V11H14V12H13V13H12V14H11V15H10V16H9V17H8V18H7V19H6V20H2V16H3V15H4V14H5V13H6V12H7V11H8V10H9V9H10V8H11V7H12" />
            </svg>
          </div>
          <div class="note__icon note__delete">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z"/>
            </svg>
          </div>
        </div>
      </li>
    </ul>`;
};