const rockImg = '<i class="fa fa-hand-rock-o" aria-hidden="true"></i>';
const scissorsImgComputer = '<i class="fa fa-hand-scissors-o" aria-hidden="true"></i>';
const scissorsImgPlayer = '<i class="fa fa-hand-scissors-o fa-flip-horizontal" aria-hidden="true"></i>';
const paperImg = '<i class="fa fa-hand-paper-o" aria-hidden="true"></i>';

const DOMStrings = {
    round: '.round',
    result: '.result',
    playerIcon: '#player-icon',
    computerIcon: '#computer-icon',
    playerScore: '#player-score',
    computerScore: '#computer-score'
};

const round = document.querySelector(DOMStrings.round);
const result = document.querySelector(DOMStrings.result);
const playerScoreDOM = document.querySelector(DOMStrings.playerScore);
const computerScoreDOM = document.querySelector(DOMStrings.computerScore);
const playerIconDOM = document.querySelector(DOMStrings.playerIcon);
const computerIconDOM = document.querySelector(DOMStrings.computerIcon);

let playerScore;
let computerScore;
let roundNumber;
let gamePlaying;

const buttons = Array.from(document.querySelectorAll('.play-button'));
buttons.forEach(cur => cur.addEventListener('click', playRound));

document.querySelector('.refresh-button').addEventListener('click', reset);

window.addEventListener('load', reset);

function computerPlay() {
    const randomNum = Math.floor(Math.random() * 3);
    const possibleMoves = ['Rock', 'Paper', 'Scissors'];

    return possibleMoves[randomNum];
}

function playRound(e, computerSelection) {
    if (gamePlaying) {
        const playerSelection = e.target.id;
        computerSelection = computerPlay();
        const outcomeStrings = [
        'You Win! Rock beats Scissors',
        'You Win! Paper beats Rock',
        'You Win! Scissors beats Paper',
        'You Lose! Paper beats Rock',
        'You Lose! Scissors beats Paper',
        'You Lose! Rock beats Scissors',
        'Draw. Play Again'];
        let outcome;

        if (playerSelection === computerSelection) {
            outcome = outcomeStrings[6];
        } else if (playerSelection === 'Rock') {
            if (computerSelection === 'Paper') {
                computerScore++;
                outcome = outcomeStrings[3];  
            } else {
                playerScore++;
                outcome = outcomeStrings[0];  
            }
        } else if (playerSelection === 'Paper') {
            if (computerSelection === 'Rock') {
                playerScore++;
                outcome = outcomeStrings[1];            
            } else {
                computerScore++;
                outcome = outcomeStrings[4];            
            }
        } else if (playerSelection === 'Scissors') {
            if (computerSelection === 'Rock') {
                computerScore++;
                outcome = outcomeStrings[5];            
            } else {
                playerScore++;
                outcome = outcomeStrings[2];            
            }
        }

        roundNumber++;

        // update the UI
        round.textContent = `Round ${roundNumber}`;
        playerIconDOM.style.visibility = 'visible';
        computerIconDOM.style.visibility = 'visible';
        playerIconDOM.innerHTML = playerSelection === 'Rock' ? rockImg:
            playerSelection === 'Paper' ? paperImg: scissorsImgPlayer;
        computerIconDOM.innerHTML = computerSelection === 'Rock' ? rockImg:
            computerSelection === 'Paper' ? paperImg: scissorsImgComputer;
        playerScoreDOM.textContent = playerScore;
        computerScoreDOM.textContent = computerScore;

        // Check if player won the game 
        if (playerScore === 5 || computerScore === 5) {
            if (playerScore > computerScore) {
                result.textContent = 'YOU WON!'
            } else {
                result.textContent = 'YOU LOST!'
            }
            gamePlaying = false;
        } else {
            result.textContent = outcome;
        }
    }
}

function reset() {
    // update data
    playerScore = 0;
    computerScore = 0;
    roundNumber = 0;
    gamePlaying = true;

    // update UI
    round.textContent = `Round 1`;
    playerScoreDOM.textContent = 0;
    computerScoreDOM.textContent = 0;
    result.textContent = '';
    playerIconDOM.style.visibility = 'hidden';
    computerIconDOM.style.visibility = 'hidden';
}