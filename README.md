# Memory Game Project

## Table of Contents

* [Instructions](#instructions)
* [Contributing](#contributing)

## Instructions

To start the game, click on a card. Try to match as many cards as possible in the shortest amount of moves.
Depending on the number of moves (attempts to match) and the number of cards matched, you'll be rewarded stars:

- 2 matches total in less than 10 moves - 1 star
- 4 matches total in less than 16 moves - 2 stars
- 8 matches total in less than 22 moves - 3 stars

For example, if you finish the game in 24 moves, you'll only get 2 stars.

To restart the game, click the restart button.

The game is written in JavaScript and uses a third party library - **[SweetAlert](https://sweetalert.js.org/)** - to create a modal and display a message at the end of the game.
It also displays a time counter implemented using [Window setInterval()](https://www.w3schools.com/jsref/met_win_setinterval.asp).
The time counter starts when the first card is clicked and ends when the last card is matched. It is then displayed as the time it took to complete the game, together with the number of stars awarded and the total number of moves.

## Contributing
Created by Alena.

