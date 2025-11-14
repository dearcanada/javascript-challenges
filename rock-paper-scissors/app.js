function playGame() {
    const userScoreSpan = document.querySelector('#user-score');
    const computerScoreSpan = document.querySelector('#computer-score');

    const roundInfo = document.querySelector('#round-info')

    const controls = document.querySelector('#controls');

    controls.addEventListener('click', (event) => {
        if (event.target.id === 'paper') humanChoice = 'paper';
        if (event.target.id === 'rock') humanChoice = 'rock';
        if (event.target.id === 'scissors') humanChoice = 'scissors';
        
        playRound();
        console.log(humanScore);
        console.log(computerScore);
    });
    
    let humanScore = 0;
    let computerScore = 0;

    let getComputerChoice = () => ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    let humanChoice;

    function playRound() {
        if (humanScore === 4 || computerScore === 4) {
            
            humanScore > computerScore ? 
                roundInfo.textContent = 'You are a winner!' :
                roundInfo.textContent = 'Computer is a winner!';

            humanScore = 0;
            computerScore = 0;
            return;
        };

        let computerChoice = getComputerChoice();

        if (
            computerChoice === 'rock' && humanChoice === ' scissors' ||
            computerChoice === 'paper' && humanChoice === 'rock' ||
            computerChoice === 'scissors' && humanChoice === 'paper'
        ) {
            roundInfo.textContent = `You lose! ${computerChoice} beats ${humanChoice}.`;
            computerScore++;
        } else if (computerChoice === humanChoice) {
            roundInfo.textContent = "It's a tie!";
        } else {
            roundInfo.textContent = 'You won!';
            humanScore++;
        };
        
        computerScoreSpan.textContent = `Computer score: ${computerScore}`;
        userScoreSpan.textContent = `Your score: ${humanScore}`;
    };
};

playGame();