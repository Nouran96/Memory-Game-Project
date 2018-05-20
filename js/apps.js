/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Increasing the timer by one second each second
function timerCount() {
    sec++;
    timer.textContent = sec;
    return sec;
}

// Adding Shuffles Cards to deck
function arrangeCards(array) {
    const docFragment = document.createDocumentFragment();
    array.forEach(element => {
        docFragment.appendChild(element);
    });
    cardsContainer.appendChild(docFragment);
}

function containerFunction(e) {
    const card = e.currentTarget;
    revealCard(card);
}

// Rotating the cards to reveal the images
function revealCard(card) {
    card.classList.toggle('open');
    if(card.classList.contains('open')){
        matchCards(card);
    }
    else {
        openCards = [];
    }
}

// See if the cards match and if they don't rotate them back
function matchCards(card) {
    openCards.push(card);
    if(openCards.length === 2){
        if(openCards[0].classList.contains(openCards[1].classList[1])){
            keepOpen(openCards);
        }
        else{
            setTimeout(function() {
                openCards.forEach(card => {
                    card.classList.remove('open');
                })
                openCards = [];
            }, 500);
        }
        countMoves();
        if(matched === cardsHtml.length / 2){
            setTimeout(endGame, 300);
        }
    }
}

// If the cards match keep them open
function keepOpen(array) {
    array.forEach(card => {
        card.removeEventListener('click', containerFunction);
        card.classList.add('match');
    });
    openCards = [];
    matched++;
}

// Increment moves counter and the star ratings
function countMoves() {
    moves.textContent = movesCounter;
    if(movesCounter === 15){
        // Two stars Rating
        stars.lastElementChild.classList.remove('fas');
        stars.lastElementChild.classList.add('far');
    }
    else if (movesCounter === 20){
        // One star Rating
        stars.children[1].classList.remove('fas');
        stars.children[1].classList.add('far');
    }
    movesCounter++;
}

// Show the end screen div with info about time taken to finish the game
function endGame() {
    endStars.innerHTML = '';
    endStars = stars.cloneNode(true);
    clearInterval(interval);
    if(timer.textContent < 30){
        message.textContent = 'Wow .. That was fast!!';
    }
    else if (timer.textContent < 50) {
        message.textContent = 'Good Job';
    }
    else {
        message.textContent = 'You could do better';
    }
    p.innerHTML = `You finished in ${timer.textContent} seconds`;
    endScreen.insertBefore(p, playAgainBtn);
    endScreen.insertBefore(endStars, p);
    endScreen.insertBefore(message, endStars);
    endScreen.classList.remove('hidden');

    playAgainBtn.addEventListener('click', playAgain);
}

// Restart the game
function playAgain() {
    endScreen.classList.add('hidden');
    for(let card of cards){
        card.classList.remove('open');
        card.classList.remove('match');
        card.addEventListener('click', containerFunction);
    }
    movesCounter = 1;
    moves.textContent = movesCounter - 1;
    sec = 0;
    timer.textContent = sec;
    matched = 0;
    stars.lastElementChild.classList.remove('far');
    stars.lastElementChild.classList.add('fas');
    stars.children[1].classList.remove('far');
    stars.children[1].classList.add('fas');
    p.parentElement.removeChild(p);
    interval = setInterval(timerCount, 1000);
    shuffle(cardsHtml);
    arrangeCards(cardsHtml);
}

// Global Declarations
const startScreen = document.querySelector('.start-screen'),
    startBtn = document.querySelector('#play'),
    timerDiv = document.querySelector('.timerDiv'),
    timer = document.querySelector('#timer'),
    cards = document.querySelectorAll('.card'),
    cardsContainer = document.querySelector('.cards-container'),
    moves = document.querySelector('.counter'),
    stars = document.querySelector('.stars'),
    endScreen = document.querySelector('.end-screen'),
    playAgainBtn = document.querySelector('#play-again'),
    p = document.createElement('p'),
    message = document.createElement('h2'),
    reloadBtn = document.querySelector('.reload');

let sec = 0,
    interval,
    cardsHtml = [],
    openCards = [],
    movesCounter = 1,
    matched = 0,
    endStars = stars.innerHTML;

// Adding a click event for the start button to remove screen and start timer
startBtn.addEventListener('click', function() {
    startScreen.classList.add('hidden');
    interval = setInterval(timerCount, 1000);
    shuffle(cardsHtml);
    arrangeCards(cardsHtml);
});

reloadBtn.addEventListener('click', playAgain);

// Adding a click event for every card to reveal its content
for(let card of cards){
    cardsHtml.push(card);
    card.addEventListener('click', containerFunction); // Container Function to be able to remove the eventListener
}