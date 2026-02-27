import { mainElement } from "./shared/app-shared.js";

export function renderHomeUI() {
  mainElement.innerHTML = 
  `
  <div class="home-tab">
    <h1>Enjoy your Delicious Meal</h1>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti repellat quis veniam sint. Laboriosam optio deleniti veritatis esse minima! Corrupti odit quas consequatur eum! Recusandae!
    </p>
    <button class="btn btn--main" type="button">Book a table</button>
    <div class="hero-image"></div>
  </div>
  `;
};
