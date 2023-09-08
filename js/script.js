const modal = document.querySelector('#modal');
const textBox = document.querySelector('#text-box');
const guessBtn = document.querySelector('#guess-btn');
const alertTextContainer = document.querySelector("#alert-text");
const modalTitleContainer = document.querySelector('#modal-title');
const modalDescriptionContainer = document.querySelector('#modal-description');

let correctAnswer;
let chancesLeft;
let gameOver = false;

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); // The maximum is inclusive and the minimum is inclusive
}

const initNewGame = () => {
    correctAnswer = getRandomIntInclusive(1, 10);
    // console.log('correct ans', correctAnswer);
    chancesLeft = 3;
    gameOver = false;
    alertTextContainer.textContent = `${chancesLeft} chances left`;
}

const displayModal = (title, description) => {
    modalTitleContainer.textContent = title;
    modalDescriptionContainer.textContent = description;
    modal.showModal();
}

const setGameOver = () => {
    guessBtn.textContent = 'Restart';
    textBox.disabled = true;
    gameOver = true;
}

guessBtn.addEventListener('click', () => {
    const number = parseInt(textBox.value);

    // if the game is over then restart the game
    if (gameOver) {
        initNewGame();
        guessBtn.textContent = 'Guess';
        textBox.disabled = false;
        return;
    }

    if (!/^[0-9]+$/.test(textBox.value)) {
        // Show warning that the input text is not a number
        displayModal('⛔ Error!', 'Please enter a valid number');
        return;
    }

    if (number === correctAnswer) {
        // Show winner message
        displayModal('Congratulations! 🎉', 'You have guessed the correct number');

        // Set game over
        setGameOver();
    }
    else {
        // decrease chances left and update chances left text from ui
        chancesLeft = chancesLeft - 1;
        alertTextContainer.textContent = `${chancesLeft} chances left`;

        // if no chances left then show loosing msg and end game and disable input.
        // if the user wants then he can restart the game again.
        if (chancesLeft === 0) {
            displayModal('Game Over! 😢', 'Wrong guess again. Better luck next time!');
            setGameOver();
            return;
        }

        // else give hint and give him another chance to guess
        if (number > correctAnswer) {
            displayModal('Opps! 🤷‍♂️', 'The correct answer is smaller than ' + number);
        }
        else {
            displayModal('Opps! 🤷‍♂️', 'The correct answer is greater than ' + number);
        }
    }
});

initNewGame();