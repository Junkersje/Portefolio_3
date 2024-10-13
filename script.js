/*
Variables to be used throughout the script
 */
let currentScore
let numberToGuess
let highScore = null
let inputNumber
let guessedNumbers = [];
let isGuessRight
const againButton = document.querySelector(".again")
const checkButton = document.querySelector(".check")
/*
Initialize game
 */
console.log("Welcome to inspector tool you cheater")
startGame()

function gameCompleted(){
    addQuestionMarkCover(false)
    if (currentScore<highScore || highScore === null){ //New highscore
        updateHighscore(currentScore)
        document.querySelector(".message").textContent = "Correct! - New Highscore! \n Play again?"
    } else {
        document.querySelector(".message").textContent = "YES! You have guessed it... Play again?"
    }
    document.querySelector(".check").textContent = "Play Again?"
    checkButton.addEventListener('click', againBtn)
}

/*
Setting defaults
 */
function startGame (){
    addQuestionMarkCover(true)
    numberToGuess = generateNewNumberToGuess()
    resetButtons()
    clearGuessedNumbersList()
    clearInputField()
    updateScore(0)
    document.querySelector(".highscore").textContent = `No Highscore`
    updateMessage("Start guessing...")
    //when game starts and a highscore is present set againbutton to reset

}
/*
buttons
 */
function checkBtn (){
    inputNumber = getInputNumber()
    addToGuessedNumbersList(inputNumber)
    isGuessRight = inputNumber === numberToGuess
    if(20 < inputNumber || inputNumber < 1){
        updateMessage("Enter only numbers between 1 - 20")
        return
    }
    updateScore(currentScore+1)
    console.log(`Is Number ${inputNumber} the same as ${numberToGuess} :  ${isGuessRight}`)
    if(isGuessRight){
        gameCompleted()
    } else {
        clearInputField()
        //add negative sound
    }
}
function againBtn (){
    addQuestionMarkCover(true)
    numberToGuess = generateNewNumberToGuess()
    resetButtons()
    clearGuessedNumbersList()
    clearInputField()
    updateScore(0)
    if (highScore !== null){
        document.querySelector(".again").textContent = "Reset Highscore?"
        againButton.addEventListener('click', () => {
            updateHighscore(null)
            resetButtons()
            document.querySelector(".highscore").textContent = `No Highscore`
        })
    }
    updateMessage("Start guessing...")
}

function resetButtons(){
    checkButton.removeEventListener('click', againBtn)
    checkButton.addEventListener('click', checkBtn)
    document.querySelector(".check").textContent = "Check!"
    againButton.removeEventListener('click', startGame)
    againButton.addEventListener('click', againBtn)
    document.querySelector(".again").textContent = "Again!"
}
function updateButtons() {
    if (0 < currentScore) {
        resetButtons()
    } else if (currentScore === 0 && highScore !== null) {
        document.querySelector(".again").textContent = "Reset Highscore?"
        againButton.addEventListener('click', () => {
            updateHighscore(null)
            resetButtons()
            document.querySelector(".highscore").textContent = `No Highscore`
        })
    }

}
/*
Input field
 */
function getInputNumber (){
        inputNumber = parseInt(document.querySelector(".guess").value);
        return inputNumber
}
function clearInputField (){
    document.querySelector('.guess').value = null ;
}
/*
Number to guess and guessed numbers
 */
function generateNewNumberToGuess (){
    // Mathfloor to round to nearest wholenum, give max value - min value + 1 for index 0 avoid, ) + min value
    numberToGuess = Math.floor(Math.random() * (20 - 1) + 1);
    console.log("Generated number to guess: " + numberToGuess)
    return numberToGuess
}
function addToGuessedNumbersList (numberToAdd) {
    guessedNumbers.push(numberToAdd)
    document.querySelector(".guessedNumbers").textContent = guessedNumbers.toString()
}
function clearGuessedNumbersList(){
    guessedNumbers = []
    document.querySelector(".guessedNumbers").textContent = "Numbers attempted will be shown here"
}
/*
Question mark concealer
 */
function addQuestionMarkCover(covered){
    if (covered){
        document.querySelector(".number").textContent = "?"
    } else {
        document.querySelector(".number").textContent = numberToGuess.toString()
    }
}
/*
Score and Highscore
 */
function updateScore (setScore){
    currentScore = setScore
    document.querySelector(".score").textContent = setScore.toString()
}
function resetScore(){
    currentScore = 0
    updateScore(currentScore)
}
function updateHighscore(newHighscore){
    document.querySelector(".highscore").textContent = `${newHighscore}`
    highScore=newHighscore
}
/*
Messages
 */
function setStartMessage(){
    document.querySelector(".message").textContent = "Start guessing..."
}
function OLDDDDDDupdateMessage (score, isCorrect) {
    if (isCorrect && score < highScore){
        document.querySelector(".message").textContent = "Correct! - New Highscore!"
        updateHighscore(score)
    } else if (isCorrect) {
        document.querySelector(".message").textContent = "That's Right!"
    } else {
        document.querySelector(".message").textContent = "Wrong... Guess again"
    }

}
function updateMessage(string){
    document.querySelector(".message").textContent = `${string}`
}
