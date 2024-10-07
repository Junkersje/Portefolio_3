/*
Variables to be used throughout the script
 */
const defaultScore = 0
const defaultHighscore = 20
let currentScore
let numberToGuess
let highScore
let inputNumber
let guessedNumbers = [];
const againButton = document.querySelector(".again")
const checkButton = document.querySelector(".check")
/*
Initialize game
 */
console.log("Welcome to inspector tool you cheater")
startGame()

/*
Setting defaults
 */
function startGame (){
    numberToGuess = generateNewNumberToGuess()
    clearInputField()
    updateScoreTo(defaultScore)
    setHighscoreTo(defaultHighscore)
    resetButtons()
    document.querySelector(".highscore").textContent = `No Highscore`
}
/*
buttons
 */
function checkBtn (){
    if (numberToGuess===null){ //If already guessed number will be null
        alreadyGuessedIt()
        return
    }
    let isGuessRight = Boolean(isNumberTheSame(getInputNumber(), numberToGuess))
    addAPointToScore(currentScore)
    console.log(`Is Number the same: ${isGuessRight}`)
    if (isGuessRight){
        isHighscoreBeatenWith(currentScore)
        showBoxNumber()
        numberToGuess=null //To avoid spamming correct answer, numberToGuess is set to null
    } else {
        addToGuessedNumbersList(getInputNumber())
        clearInputField()
    }
    updateMessage(currentScore, isGuessRight)
}
function againBtn (){
    if(currentScore===0 && highScore<20){ //Reset highscore
        document.querySelector(".again").textContent = "Reset Highscore?"
        againButton.addEventListener('click', resetHighscore)
        return
    }
    console.log(`Again button is clicked.\nScore reset`);
    resetButtons()
    hideBoxNumber()
    clearInputField()
    clearGuessedNumbersList()
    numberToGuess = generateNewNumberToGuess()
    resetScore()
    setStartMessage()

}
function resetButtons(){
    checkButton.removeEventListener('click', againBtn)
    checkButton.addEventListener('click', checkBtn)
    document.querySelector(".check").textContent = "Check!"
    againButton.addEventListener('click', againBtn)
    document.querySelector(".again").textContent = "Again!"
}
/*
Input field
 */
function getInputNumber (){
        inputNumber = parseInt(document.querySelector(".guess").value);
        return inputNumber
}
function clearInputField (){
    document.querySelector('.guess').value = "0";
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
function isNumberTheSame (a, b) {
    console.log(`Checking if '${a}' is the same as '${b}'`)
    return Boolean(a === b)
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
function showBoxNumber(){
    document.querySelector(".number").textContent = numberToGuess.toString()
}
function hideBoxNumber(){
    document.querySelector(".number").textContent = "?"
}
/*
Score and Highscore
 */
function updateScoreTo (setScore){
    currentScore = setScore
    document.querySelector(".score").textContent = setScore.toString()
}
function resetScore(){
    currentScore = 0
    updateScoreTo(currentScore)
}
function addAPointToScore(score){
    score++
    updateScoreTo(score)
}
function setHighscoreTo(newHighscore){
    document.querySelector(".highscore").textContent = `${newHighscore}`
    highScore=newHighscore
}
function isHighscoreBeatenWith(score){
    return score < highScore;
}
/*
Message
 */
function setStartMessage(){
    document.querySelector(".message").textContent = "Start guessing..."
}
function updateMessage (score, isCorrect) {
    if (isCorrect && isHighscoreBeatenWith(score)){
        document.querySelector(".message").textContent = "Correct! - New Highscore!"
        setHighscoreTo(score)
    } else if (isCorrect) {
        document.querySelector(".message").textContent = "That's Right!"
    } else {
        document.querySelector(".message").textContent = "Wrong... Guess again"
    }

}
function alreadyGuessedIt (){
    document.querySelector(".message").textContent = "You have already guessed it... Play again?"
    document.querySelector(".check").textContent = "Play Again?"
    checkButton.addEventListener('click', againBtn)
}
function resetHighscore (){
    startGame()
}