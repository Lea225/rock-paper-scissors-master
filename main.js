document.addEventListener('DOMContentLoaded', () => {
    const choices = ['rock', 'paper', 'scissors'];
    let playerScore = 0;
    let computerScore = 0;
    let rounds = 10;

    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    const playerInterface = document.querySelector('.player-interface');
    const buttons = document.querySelector('.buttons');
    const choiceSection = document.querySelector('.choice');
    const rulesBtn = document.querySelector('.rules-btn');
    const rulesDiv = document.querySelector('.rules');
    const closeIcon = document.querySelector('.icon-close');
    const overlay = document.querySelector('.overlay');

    const resetGame = () => {
        rounds = 10;
        playerInterface.style.display = 'block';
        choiceSection.style.display = 'none';
    }

    const resetScores = () => {
        playerScore = 0;
        computerScore = 0;
        rounds = 10;
        playerScoreElement.textContent = playerScore;
        computerScoreElement.textContent = computerScore;
        playerInterface.style.display = 'block';
        choiceSection.style.display = 'none';
    }

    const computerPlay = () => {
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    }

    const determineWinner = (playerSelection, computerSelection) => {
        if (playerSelection === computerSelection) {
            return 'draw';
        }
        if (
            (playerSelection === 'rock' && computerSelection === 'scissors') ||
            (playerSelection === 'scissors' && computerSelection === 'paper') ||
            (playerSelection === 'paper' && computerSelection === 'rock')
        ) {
            return 'player';
        }
        return 'computer';
    }

    const handleChoiceClick = (event) => {
        const target = event.target;
        if (!target.classList.contains('paper-btn') && !target.classList.contains('scissors-btn') && !target.classList.contains('rock-btn')) {
            return; // Ne fait rien si le clic n'est pas sur un des boutons
        }

        const playerSelection = target.className.split('-')[0];
        playerInterface.style.display = 'none';
        choiceSection.style.display = 'flex';

        // Affiche immédiatement le choix du joueur
        choiceSection.innerHTML = `
            <div class="player-choice">
                <h3>You Picked</h3>
                <div class="player-choice-div">
                    <div class="choice-${playerSelection}-div">
                    <button class="${playerSelection}-btn"></button>
                    </div>
                </div>
            </div>

            <div class="house-choice">
                <h3>The House Picked</h3>
                <div class="house-choice-div">
                    <div class="empty-div"></div>
                </div>
            </div>
        `;

        // Délai de 5 secondes avant que l'ordinateur fasse son choix
        setTimeout(() => {
            const computerSelection = computerPlay();
            const winner = determineWinner(playerSelection, computerSelection);

            choiceSection.querySelector('.house-choice .house-choice-div').innerHTML = `
                <div class="choice-${computerSelection}-div">
                    <button class="${computerSelection}-btn"></button>
                </div>
            `;

            // Crée le résultat
            const resultDiv = document.createElement('div');
            resultDiv.innerHTML = `
                <p class="result-message">${winner === 'player' ? 'You Win' : winner === 'computer' ? 'You Lose' : "It's a Draw"}</p>
                <button class="replay">Play Again</button>
            `;

            // Insère le résultat entre les choix du joueur et de l'ordinateur
            const playerChoiceDiv = choiceSection.querySelector('.player-choice');
            const houseChoiceDiv = choiceSection.querySelector('.house-choice');
            choiceSection.insertBefore(resultDiv, houseChoiceDiv);

            if (winner === 'player') {
                playerScore++;
                document.querySelector('.player-choice div').classList.add('wave-effect');
            } else if (winner === 'computer') {
                computerScore++;
                document.querySelector('.house-choice div').classList.add('wave-effect');
            }

            playerScoreElement.textContent = playerScore;
            computerScoreElement.textContent = computerScore;

            rounds--;
            if (rounds === 0) {
                setTimeout(resetScores, 2000);
            }

            document.querySelector(".replay").addEventListener("click", resetGame);
        }, 5000);
    }

    const toggleRules = () => {
        rulesDiv.classList.toggle('hidden');
        overlay.classList.toggle('hidden');
    }

    buttons.addEventListener('click', handleChoiceClick);
    rulesBtn.addEventListener('click', toggleRules);
    closeIcon.addEventListener('click', toggleRules);
    overlay.addEventListener('click', toggleRules);
});
