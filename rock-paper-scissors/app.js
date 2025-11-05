function playGame() {
    let humanScore = 0;
    let computerScore = 0;

    let getComputerChoice = () => ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
    let getHumanChoice = () => humanChoice = prompt('Item to throw?');

    function playRound() {
        for (let round = 1; round <= 5; round++) {
            console.log(`===== ROUND ${round} ======`);

            let computerChoice = getComputerChoice();
            let humanChoice = getHumanChoice();

            console.log(`Computer: ${computerChoice}`);
            console.log(`You: ${humanChoice}`);
            
            if (
                computerChoice === 'rock' && humanChoice === ' scissors' ||
                computerChoice === 'paper' && humanChoice === 'rock' ||
                computerChoice === 'scissors' && humanChoice === 'paper'
            ) {
                console.log(`You lose! ${computerChoice} beats ${humanChoice}.`);
                computerScore++;
            } else if (computerChoice === humanChoice) {
                console.log("It's a tie!");
                round--;
            } else {
                console.log('You won!');
                humanScore++;
            };
        };
    };

    playRound();
};

playGame();