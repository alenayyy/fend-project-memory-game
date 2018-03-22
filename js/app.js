/*
 * Create a list that holds all of your cards
 */

// number or columns
const columns = 4;
// number of rows
const rows = 4;
// list that holds all the cards
let cards = [];
// list of symbols
const symbols =['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];
// load the cards
for(i = 0; i < columns * rows; i++) {
  let symbolsIndex = (i >= symbols.length) ? i % symbols.length : i;
  cards[i] = symbols[symbolsIndex];
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// shuffle the list of cards using the provided "shuffle" method below
let shuffledCards = shuffle(cards);

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

// select the 'deck' element from the document
const deck = document.querySelector('.deck');

// loop through each card and create its HTML
shuffledCards.forEach( (card) => {
  // create the <li> element
  let cardElement = document.createElement('li');
  // set the class = 'card', on the <li>
  cardElement.setAttribute('class', 'card');
  // create the <i> element
  let cardSymbolElement = document.createElement('i');
  // set the class = whatever the card is from shuffledCards, on the <i>
  cardSymbolElement.setAttribute('class', 'fa '+card);
  // append the <i> to <li>
  cardElement.appendChild(cardSymbolElement);
  // append the <li> to <div class=deck>
  deck.appendChild(cardElement);
});


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
 
