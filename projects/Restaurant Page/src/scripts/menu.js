import { mainElement } from "./shared/app-shared.js";

export function renderMenuUI() {
  mainElement.innerHTML = 
  `
  <div class="menu-tab">
    <article class="item">
      <div class="item__preview item__desc--placeholder-one"></div>
      <span class="item__heading">Lorem, ipsum.</span>
      <span class="item__desc">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore dignissimos accusantium, natus assumenda esse totam.
      </span>
    </article>
    
    <article class="item">
      <span class="item__heading">Lorem, ipsum.</span>
      <div class="item__preview item__desc--placeholder-two"></div>
      <span class="item__desc">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro nisi iste sed nostrum a incidunt?</span>
    </article>

    <article class="item">
      <span class="item__heading">Lorem, ipsum.</span>
      <div class="item__preview item__desc--placeholder-three"></div>
      <span class="item__desc">Porro nisi iste sed nostrum a incidunt?</span>
    </article>

    <article class="item">
      <span class="item__heading">Lorem, ipsum.</span>
      <div class="item__preview item__desc--placeholder-four"></div>
      <span class="item__desc">Lorem, ipsum. Porro nisi iste sed nostrum a incidunt consectetur adipisicing elit?</span>
    </article>
  </div>
  `;
};