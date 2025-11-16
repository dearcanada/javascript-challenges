function paintOverCell() {
  const etchBoard = document.querySelector('#js-etch-board');

  etchBoard.addEventListener('mouseover', (event) => {
    let target = event.target;

    if (target.classList.contains('colored')) return;
    if (target.classList.contains('etch-dot')) target.classList.add('colored')

  });
};

paintOverCell();