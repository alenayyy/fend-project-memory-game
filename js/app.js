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
shuffledCards.forEach( (card, i) => {
  // create the <li> element
  let cardElement = document.createElement('li');
  cardElement.setAttribute('id', i+'_'+card);
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
 // set up the event listener for the deck
 deck.addEventListener('click', respondToTheClick);

// define a list for open cards
let openCards = [];

// respond to click event
function respondToTheClick(evt) {
  // if click not on a card or click is on a matched card, don't do anything
  if(invalidClick(evt.target))
    return;

  displayCardSymbol(evt);
  sleep(600).then(() => addCardToOpenCards(evt));
}

// set the card clicked to show
function displayCardSymbol(evt) {
  evt.target.className = 'card open show';
}

// ad card clicked to openCards and then lock, hide or do nothing
function addCardToOpenCards(evt) {

  // add the card to a *list* of "open" cards
  openCards.push(evt.target.id);

  // get the cards from openCards that are matching the clicked card
  let matchingCards = getMatchingCards(evt.target.id);

  // if there are 2 cards in openCards that are the same, lock the cards (change the class to card match)
  if(matchingCards.length == 2) {
    lockCards(matchingCards);
  }
  else {
    // if the clicked card doesn't have a match, check if there's an even number of cards in openCards and, if there are, hide them
    if(openCards.length % 2 === 0)
      hideCards();
  }
}

// get the card ids from openCards matching the cardId
function getMatchingCards(cardId) {
    return openCards.filter(c => cardsAreMatching(c, cardId));
}

// check if card1 and card2 ids have the same symbol (for example: '4_fa-boom' has the same symbol with '12_fa-boom')
function cardsAreMatching(card1, card2) {
    let re = /\d+_(.*)/;          // match examples: 4_something or 12_something
    let s1 = card1.match(re);     // s1 is an array from which the second element matches the symbol
    let s2 = card2.match(re);     // s2 is an array from which the second element matches the symbol
    return s1.length >= 2 && s2.length >= 2 && s1[1] === s2[1];
}

// for each element with id from cardIdsToLock, change the class to 'card match'
function lockCards(cardIdsToLock) {
    cardIdsToLock.forEach(cardId => document.getElementById(cardId).className = 'card match');
}

// remove the last 2 cards from openCards and for each of them, change the class to 'card'
function hideCards() {
  let cardIdsToHide = openCards.splice(-2, 2);
  cardIdsToHide.forEach(cardId => document.getElementById(cardId).className = 'card');
}

// if click is not on a card or, if click is on a card that has already been matched, return true
function invalidClick(el) {
  return el.nodeName.toLowerCase() !== 'li' || getMatchingCards(el.id).length == 2;
}

// sleep some time and then execute
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
