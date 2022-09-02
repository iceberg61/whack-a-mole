const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;

// create a function to make a random time for a mole to pop up
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function RandomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);
    const hole = holes[index];

    // prevent same hole from getting the same number
    if (hole === lastHole) {
        return RandomHole(holes);
    }
    lastHole = hole;
    return hole;
}

//  create a function that makes apper and dissapper for a random amount of time in a random hole
function peep() {
    const time = randomTime(500, 1000);  //get a random time to determine how long mole should peep
    const hole = RandomHole(holes); //get the random hole from the randomHole function
    hole.classList.add('up'); //add the css class so selected mole can pop up
    setTimeout(() => {
        hole.classList.remove('up'); //make the selected mole can pop down after a random time
        if(!timeUp) {
            peep();
        }
    }, time)
}

// create a function that start the function
function startGame() {
    scoreBoard.textContent = 0;
    timeUp = false;
    score = 0;
    peep();
    setTimeout(() => timeUp = true, 15000) // shows random moles each 15 second
}

// create a function that update how many moles you wack + updating the score board
function whack(e) {
    if (!e.isTrusted) return;
    score++;
    this.parentNode.classList.remove('up'); //refers to the item clicked
    scoreBoard.textContent = score;
        
}

moles.forEach(mole => mole.addEventListener('click', whack));