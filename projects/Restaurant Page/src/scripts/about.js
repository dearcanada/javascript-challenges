import { mainElement } from "./shared/app-shared.js";

export function renderAboutUI() {
  mainElement.innerHTML =
  `
  <div class="about-tab">
    <h1 class="about__heading">Authors</h1>

    <div class="authors">
      <div class="person">
        <div class="person__image person__image--placeholder-one"></div>
        <span class="person__name">Lorem</span>
        <span class="person__desc">Lorem ipsum dolor sit amet consectetur.</span>
      </div>
      
      <div class="person">
        <div class="person__image person__image--placeholder-two"></div>
        <span class="person__name">Lorem</span>
        <span class="person__desc">Lorem ipsum  Lorem ipsum dolor sit amet. consectetur.</span>
      </div>
    </div>
    
    <address>
      Contact Us:
      <a href="#">www.example.com</a>.<br />
      If you see any bugs, please
      <a href="#">contact webmaster</a>.<br />
    </address>
  </div>
  `;
};