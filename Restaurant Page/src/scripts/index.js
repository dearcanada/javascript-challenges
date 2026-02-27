import "../styles/index.css";
import { renderHomeUI } from "./home.js";
import { renderMenuUI } from "./menu.js";
import { renderAboutUI } from "./about.js";

renderHomeUI();

const headerElement = document.querySelector('#header');

headerElement.addEventListener('click', event => {
  const target = event.target;
  const targetText = target.textContent;

  if (targetText === 'Home') {
    renderHomeUI();
  } else if (targetText === 'Menu') {
    renderMenuUI();
  } else if (targetText === 'About') {
    renderAboutUI();
  };
});