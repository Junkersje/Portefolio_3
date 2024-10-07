/*
 I think my check button will have the code as a main function
 I want to run all the code if conditions are met and check if conditions are met
 */
const checkButton = document.querySelector(".check")

    checkButton.addEventListener('click', () => {
        console.log("button clicked")
        console.log(`Is Number the same: ${isNumberTheSame(getInputNumber(), numberToGuess)}`)

    });


function getInputNumber (){
        let inputNumber = document.querySelector(".guess").value;
        console.log(`Input Number: ${inputNumber}`)
        return inputNumber
}

function getNumberToGuess (){
    return Math.floor(Math.random() * (20 - 1 + 1) + 1);
    // Mathfloor to round to nearest wholenum, give max value - min value + 1 for index 0 avoid, ) + min value
}

const numberToGuess = getNumberToGuess()
console.log(numberToGuess)

function isNumberTheSame (a, b) {
    return Boolean(a === b)
}


/*
Lav en nummer sammenligner til at checke om tallene er de samme og derfra sætte en "guessed number"
var til at være true, hvor if true i css vil lave spørgsmltegnet om til tallet selv i spørgsmålstegnets felt

 */
