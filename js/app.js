// number or columns
const columns = 4;
// number of rows
const rows = 4;
// list that holds all the cards
let cards = [];
// array to keep the open cards (ids)
let openCards = [];
// count of number of moves
let moveCounter;
// list of symbols
const symbols =['fa-diamond', 'fa-paper-plane-o', 'fa-anchor', 'fa-bolt', 'fa-cube', 'fa-leaf', 'fa-bicycle', 'fa-bomb'];

// load the cards
for(i = 0; i < columns * rows; i++) {
  let symbolsIndex = (i >= symbols.length) ? i % symbols.length : i;
  cards[i] = symbols[symbolsIndex];
}

// elements to work with
const deck = document.querySelector('.deck');
const restartButton = document.querySelector('.restart');
let moveCounterElement = document.querySelector('.moves');
let starCounterElement = document.querySelector('.stars');

// add event listener for clicks
deck.addEventListener('click', flipCard);
restartButton.addEventListener('click', startGame);

// start the game
startGame();

// ------------------------------------- FUNCTIONS  ------------------------------------- //

function startGame() {

  // clear the deck - there syould only be an empty <ul class="deck"></ul> element
  deck.innerHTML = "";

  // set the move counter and the star counter elments to be empty (zero moves and no stars)
  moveCounter = 0;
  starCounter = 0;
  moveCounterElement.innerText = moveCounter;
  starCounterElement.innerHTML = "";

  // reset the openCards array to be empty
  openCards.length = 0;

  // shuffle the list of cards using the provided "shuffle" method
  let shuffledCards = shuffle(cards);

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
 }

// respond to click event
function flipCard(evt) {
  // if click not on a card or click is on a matched card, don't do anything
  if(invalidClick(evt.target))
    return;

  showAndMatchOrHideCard(evt);
}

function showAndMatchOrHideCard(evt) {

  // add card id to openCards
  openCards.push(evt.target.id);

  // get the matching cards from openCards (card ids having the same symbol with the card clicked)
  let matchingCards = getMatchingCards(evt.target.id);

  if(matchingCards.length == 2) {
    // if there are 2 matching card ids, lock them (we have a match!)
    lockCards(matchingCards);
  }
  else {
    if(openCards.length % 2 === 0) {
      // if the clicked card doesn't have a match, check if there's an even number of cards in openCards and, if there are, hide them
      hideCards();
    }
    else {
      // show the card since it was the first one from a pair to match
      evt.target.className = 'card open show';
    }
  }
}

// get the card ids from openCards matching the cardId
function getMatchingCards(cardId) {
    return openCards.filter(openCardId => cardsAreMatching(openCardId, cardId));
}

// check if card1 and card2 ids have the same symbol (for example: '4_fa-boom' has the same symbol with '12_fa-boom')
function cardsAreMatching(cardId1, cardId2) {
                                    // using regular expressions to match similar
    let re = /\d+_(.*)/;            // match examples: 4_something or 12_something
    let s1 = cardId1.match(re);     // s1 is an array from which the second element matches the symbol
    let s2 = cardId2.match(re);     // s2 is an array from which the second element matches the symbol

    // we only chare about the symbol so we check if the 2 matches have the same symbol
    return s1.length >= 2 && s2.length >= 2 && s1[1] === s2[1];
}

// for each element with id from cardIdsToLock, change the class to 'card match'
function lockCards(cardIdsToLock) {

    cardIdsToLock.forEach(cardId => document.getElementById(cardId).className = 'card open show bounceIn');
    sleep(600).then(() => cardIdsToLock.forEach(cardId => document.getElementById(cardId).className = 'card match'));
    incrementMoveCounterAndStars();

    if(openCards.length === rows * columns) {
      if(moveCounter <= 22) {
        starCounter += 1;
        starCounterElement.append(makeStar());
      }
      swal({
        title: "Congratulations! You Won!",
        text: "With " + moveCounter + " moves and " + starCounter + " stars!" ,
        icon: "success",
        buttons: {
          cancel: "Quit",
          continue: {
            text: 'Play again',
            value: 'yes'
          }
        }
      }).then( (value) => {
        switch(value) {
          case "yes": startGame();
            break
          default:
            swal("Goodbye!");
        }
      });
    }
}

// remove the last 2 cards from openCards and for each of them, change the class to 'card'
function hideCards() {
  let cardIdsToHide = openCards.splice(-2, 2);
  cardIdsToHide.forEach(cardId => document.getElementById(cardId).className = 'card fail show shake');
  sleep(600).then(() => cardIdsToHide.forEach(cardId => document.getElementById(cardId).className = 'card'));
  incrementMoveCounterAndStars();
}

// if click is not on a card or, if click is on a card that has already been matched, return true
function invalidClick(el) {
  return el.nodeName.toLowerCase() !== 'li' || getMatchingCards(el.id).length == 2;
}

function incrementMoveCounterAndStars() {
  moveCounter += 1;
  moveCounterElement.innerText = moveCounter;

  if(openCards.length >= 4 && moveCounter <= 10 && starCounter < 1) {
    starCounter += 1;
    starCounterElement.append(makeStar());
  }
  else if(openCards.length >= 8 && moveCounter <= 16 && starCounter < 2) {
    starCounter += 1;
    starCounterElement.append(makeStar());
  }
}

function makeStar() {
  let starElementFa = document.createElement('i');
  starElementFa.setAttribute('class', 'fa fa-star');
  let starElement = document.createElement('li').appendChild(starElementFa);
  return starElement;
}

// sleep some time and then execute
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
