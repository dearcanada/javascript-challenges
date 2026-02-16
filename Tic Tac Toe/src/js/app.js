const GameboardUI = (function() {
  const boardButtons = document.querySelector('#controls-id');
  const startButton = document.querySelector('#start-btn');
  const gameboardElement = document.querySelector('#board-id');
  const popoverElement = document.querySelector('#popover');
  const playerOneInput = document.querySelector('#player-one');
  const playerTwoInput = document.querySelector('#player-two');
  const submitButton = document.querySelector('#submit-button');
  const playerLabel = document.querySelector('#player-label');
  const resetButton = document.querySelector('#reset-btn');

  function renderDOM() {
    boardButtons.addEventListener('click', event => {
      const target = event.target;

      if (target === startButton) {
        popoverElement.showModal();
      };
      if (target === resetButton) {
        Gameboard.resetGame();
      };
    });

    gameboardElement.addEventListener('click', event => {

    });
    
    popoverElement.addEventListener('click', event => {

    });

    submitButton.addEventListener('click', event => {
      event.preventDefault();

      if (!playerOneInput.value && !playerTwoInput.value) {
        throw Error(`Input fields cannot be empty.`);
      };

      const playerOneName = playerOneInput.value;
      const playerTwoName = playerTwoInput.value;

      Gameboard.startGame(playerOneName, playerTwoName);
      popoverElement.close();
    });
  };

  return {
    renderDOM, 
  };
})();

const Gameboard = (function(doc) {
  const boardData =[['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
  let playerOne = null;
  let playerTwo = null;
  let currentTurn = null;
  let gameStatus = false;

  const log = (message) => {
    console.log(`[${Date.now()}] Logger: ${message}`);
  };

  const startGame = (playerOneName, playerTwoName) => {
    if (gameStatus === true) {
      return log('Game is already running!');
    };

    if (!playerOneName || !playerTwoName) {
      return log('Function\'s arguments (2) cannot be empty.')
    };
    
    playerOne = createPlayer(playerOneName, 'X');
    playerTwo = createPlayer(playerTwoName, 'O');

    gameStatus = true;
    currentTurn = playerOne;

    log('Starting game...');
  };

  const turn = () => { 
    if (gameStatus === false) {
      return log('Can\'t do a turn. You should start a new game!');
    };
    
    const row = prompt(`${currentTurn.name}'s turn. Row (1-3)?`);
    const column = prompt(`${currentTurn.name}'s turn. Column (1-3)?`);

    if (canAddMark(row, column) === false) {
      return log('Can\'t overwrite a mark');
    };
    
    if (currentTurn === playerOne) {
      boardData[row - 1].splice(column - 1, 1, playerOne.mark);
      checkBoardData(currentTurn);

      currentTurn = playerTwo;
    } else {
      boardData[row - 1].splice(column - 1, 1, playerTwo.mark);
      checkBoardData(currentTurn);

      currentTurn = playerOne;
    };
  };

  function canAddMark(boardRow, boardCol) {
    if (
      boardData[boardRow - 1][boardCol - 1] === playerOne.mark ||
      boardData[boardRow - 1][boardCol - 1] === playerTwo.mark
    ) {
      return false;
    } else {
      return true;
    };
  };

  const checkBoardData = ( { mark } ) => {
    function logWinner() {
      resetGame(`${currentTurn.name} wins!`);
    };

    for (let i = 0; i < 3; i++) {
      if (
        // Rows
        boardData[i][0] === mark &&
        boardData[i][1] === mark && 
        boardData[i][2] === mark
      ) {
        return logWinner();
      } else if (
        // Columns
        boardData[0][i] === mark &&
        boardData[1][i] === mark && 
        boardData[2][i] === mark
      ) {
        return logWinner();
      } else if (
        // Left diagonal
        boardData[0][0] === mark &&
        boardData[1][1] === mark && 
        boardData[2][2] === mark
      ) {
        return logWinner();
      } else if (
        // Right diagonal
        boardData[0][2] === mark &&
        boardData[1][1] === mark && 
        boardData[2][0] === mark
      ) {
        return logWinner();
      };
    };

    log('Tie!');
  };

  const viewBoard = () => {
    log(
      `
      \n${boardData[0][0]} ${boardData[0][1]} ${boardData[0][2]}
      \n${boardData[1][0]} ${boardData[1][1]} ${boardData[1][2]}
      \n${boardData[2][0]} ${boardData[2][1]} ${boardData[2][2]}
      `
    );
  };

  const currentPlayerTurn = () => {
    if (!gameStatus) {
      return log('Start a new game to use this option!');
    } else {
      return currentTurn.name;
    };
  };
  
  function createPlayer(playerName, playerMark) {
    return {
      name: playerName,
      mark: playerMark,
    };
  };

  function resetGame(message) {
    if (!gameStatus) {
      return log('Can\'t reset. Start a new game before!');
    };
    
    if (!message) {
      message = 'Resetting game...';
    };
    
    for (row of boardData) {
      for (let i = 0; i < 3; i++) {
        row[i] = '.';
      };
    };
    
    gameStatus = false;
    currentTurn = null;
    playerOne = null;
    playerTwo = null;

    log(message);
  };
  
  GameboardUI.renderDOM();
  
  return {
    startGame, turn, viewBoard, currentPlayerTurn, resetGame,
  };
})();
// The last player that has a turn defines the winner or a tie. 
// This way of thinking helped me to make validation function way easier
// (i was tryna pass two object or some other bs for some reason) 