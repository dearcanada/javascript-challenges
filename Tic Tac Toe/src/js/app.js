const GameboardUI = (function() {
  const boardButtons = document.querySelector('#controls-id');
  const startButton = document.querySelector('#start-btn');
  const popoverElement = document.querySelector('#popover');
  const playerOneInput = document.querySelector('#player-one');
  const playerTwoInput = document.querySelector('#player-two');
  const submitButton = document.querySelector('#submit-button');
  const resetButton = document.querySelector('#reset-btn');
  const cancelButton = document.querySelector('#cancel-button');
  const boardElement = document.querySelector('#board-id');
  const spanWinner = document.querySelector('#winner-id');

  function renderDOM() {
    boardButtons.addEventListener('click', event => {
      const target = event.target;

      if (target === startButton) {
        if (!Gameboard.getGameStatus()) {
          popoverElement.showModal();
        } else {
          confirm('Game is already running in the console.\nRestart the game?') ?
            resetButton.click() : '';
        };
      };
      
      if (target === resetButton) {
        Gameboard.resetGame();
        boardElement.classList.remove('board');
        boardElement.innerHTML = '';                
        
        startButton.classList.remove('hidden');
        resetButton.classList.add('hidden');
        spanWinner.textContent = '';
      };
    });

    cancelButton.addEventListener('click', () => {
      popoverElement.close()
    });
      
    submitButton.addEventListener('click', event => {
      event.preventDefault();

      if (!playerOneInput.value || !playerTwoInput.value) {
        throw Error(`Input fields cannot be empty.`);
      };

      resetButton.classList.remove('hidden');
      startButton.classList.add('hidden');

      const playerOneName = playerOneInput.value;
      const playerTwoName = playerTwoInput.value;

      boardElement.classList.add('board');
      boardElement.innerHTML = 
      `
        <h2 class="hidden">Game board controls</h2>
        <div class="board__area" data-row="1" data-column="1"></div>
        <div class="board__area" data-row="1" data-column="2"></div>
        <div class="board__area" data-row="1" data-column="3"></div>
        <div class="board__area" data-row="2" data-column="1"></div>
        <div class="board__area" data-row="2" data-column="2"></div>
        <div class="board__area" data-row="2" data-column="3"></div>
        <div class="board__area" data-row="3" data-column="1"></div>
        <div class="board__area" data-row="3" data-column="2"></div>
        <div class="board__area" data-row="3" data-column="3"></div>
      `;
      
      Gameboard.startGame(playerOneName, playerTwoName);
      popoverElement.close();
    });
    
    boardElement.addEventListener('click', event => {
      const target = event.target;
      
      if (!Gameboard.getGameStatus()) return;
      if (Gameboard.isGameOver() === true) return;
      if (target === boardElement) return;
      if (target.innerHTML !== '') return;

      const cross = `
        <div class="cross mark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <path d="M 15 15 L 85 85" stroke-width="15" stroke-linecap="round"/>
            <path d="M 85 15 L 15 85" stroke-width="15" stroke-linecap="round"/>
          </svg>
        </div>
      `;
      
      const circle = `
        <div class="circle mark">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke-width="15"/>
          </svg>
        </div>
      `;
            
      if (Gameboard.currentPlayerTurn().mark === 'X') {
        Gameboard.turn(target.dataset.row, target.dataset.column);
        target.innerHTML = cross;
      } else {
        Gameboard.turn(target.dataset.row, target.dataset.column);
        target.innerHTML = circle;
      };
      
      if (Gameboard.getWinner() === 'X') {
        spanWinner.textContent = 'Blue wins!';
      } else if (Gameboard.getWinner() === 'O') {
        spanWinner.textContent = 'Red wins!';
      } else if (Gameboard.getWinner() === 'Tie') {
        spanWinner.textContent = 'Tie!';
      };
    });
  };

  const resetUI = () => {
    spanWinner.textContent = '';
    boardElement.innerHTML = '';
    boardElement.classList.remove('board');
    startButton.classList.remove('hidden');
    resetButton.classList.add('hidden');
  };

  return {
    renderDOM, resetUI,
  };
})();

const Gameboard = (function() {
  const boardData =[['.', '.', '.'], ['.', '.', '.'], ['.', '.', '.']];
  let playerOne = null;
  let playerTwo = null;
  let currentTurn = null;
  let gameStatus = false;
  let gameSpectateState = {
    gameOver: false,
    winner: null,
  };

  const log = (message) => {
    console.log(`[${Date.now()}] Logger: ${message}`);
  };

  const startGame = (playerOneName, playerTwoName) => {
    if (isGameOver() === true) {
      return log('Game is in the spectate state. Reset to start a new one.')
    }
    if (gameStatus === true) {
      return log('Game is already running!');
    };

    if (!playerOneName || !playerTwoName) {
      return log(`Function parameters (${Gameboard.startGame.length}) cannot be empty.`);
    };
    
    playerOne = createPlayer(playerOneName, 'X');
    playerTwo = createPlayer(playerTwoName, 'O');

    gameStatus = true;
    currentTurn = playerOne;

    log('Starting game...');
  };

  const turn = (row, column) => { 
    if (gameStatus === false) {
      return log('Can\'t do a turn. You should start a new game!');
    };
    if (!row || !column) {
      return (`Function parameters (${Gameboard.startGame.length}) cannot be empty.`);
    };
    if (gameSpectateState.gameOver === true) {
      return log('Can\'t do a turn when the game is over.');
    };
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

  const canAddMark = (boardRow, boardCol) => {
    if (
      boardData[boardRow - 1][boardCol - 1] === playerOne.mark ||
      boardData[boardRow - 1][boardCol - 1] === playerTwo.mark
    ) {
      return false;
    } else {
      return true;
    };
  };

  const getGameStatus = () => gameStatus;
  const isGameOver = () => gameSpectateState.gameOver;
  const getWinner = () => gameSpectateState.winner;

  const checkBoardData = ( { mark } ) => {
    function logWinner(winnerData) {
      if (!winnerData === ' Tie') {
        log(`${currentTurn.name} wins!`);        
      } else {
        log('It\'s a Tie. Game is over.');        
      };
      gameSpectateState.gameOver = true;
      gameSpectateState.winner = winnerData;
    };

    for (let i = 0; i < 3; i++) {
      if (
        // Rows
        boardData[i][0] === mark &&
        boardData[i][1] === mark && 
        boardData[i][2] === mark
      ) {
        return logWinner(mark);
      } else if (
        // Columns
        boardData[0][i] === mark &&
        boardData[1][i] === mark && 
        boardData[2][i] === mark
      ) {
        return logWinner(mark);
      } else if (
        // Left diagonal
        boardData[0][0] === mark &&
        boardData[1][1] === mark && 
        boardData[2][2] === mark
      ) {
        return logWinner(mark);
      } else if (
        // Right diagonal
        boardData[0][2] === mark &&
        boardData[1][1] === mark && 
        boardData[2][0] === mark
      ) {
        return logWinner(mark);
      } else if (
        !boardData[0].includes('.') &&
        !boardData[1].includes('.') &&
        !boardData[2].includes('.')
      ) {
        logWinner('Tie');
        return false;
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
      return currentTurn;
    };
  };
  
  const createPlayer = (playerName, playerMark) => {
    return {
      name: playerName,
      mark: playerMark,
    };
  };

  const resetGame = (message) => {
    if (!gameStatus) {
      return log('Can\'t reset. Start a new game before!');
    };
    if (!message) {
      message = 'Resetting the game...';
    };
    
    for (row of boardData) {
      for (let i = 0; i < 3; i++) {
        row[i] = '.';
      };
    };
    
    gameStatus = false;
    gameSpectateState.gameOver = false;
    gameSpectateState.winner = null;
    currentTurn = null;
    playerOne = null;
    playerTwo = null;

    log(message);
  };
  
  GameboardUI.renderDOM();
  
  return {
    startGame,
    turn, 
    viewBoard, 
    currentPlayerTurn, 
    resetGame, 
    getGameStatus,
    isGameOver, 
    getWinner, 
  };
})();