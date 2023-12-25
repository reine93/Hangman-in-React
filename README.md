# Hangman (in React!)

## About the Game

This is a classic Hangman game but instead of guessing a word, player is expected to guess a quote from a famous person.
If game is reset or page is refreshed, a new quote will be generated.
This project has been coded using ReactJS library

## Installation

The game is deployed at the following URL: https://fascinating-figolla-49a3ef.netlify.app/.

If you want to run the game locally, after cloning the project, you should:

# Install Dependencies

In the project directory, run `npm install`` to install all necessary dependencies.

# Run in Development Mode

Run `npm start` to run the app in development mode. This will usually open the game in your default web browser automatically. If it doesn't, you can manually visit http://localhost:3000 (or the port specified in your terminal).

-or-

# Build for Production:

Run `npm run build` to build the app for production.
Then, serve it from a static server by running `serve -s build`

## Gameplay

Upon starting the game, you will be propmted for player name. After you enter your name, game starts.
You will be presented by empty "gallow" and a series of underscores representing the letters in the hidden quote.
You can start guessing letters one by one. If the guessed letter is in the quote, it will be revealed in its correct position(s).
Only English alphabet letters are accepted.
If the guessed letter is not in the quote, a part of the hangman figure will be drawn.
Keep guessing until you either guess the quote correctly (win) or the hangman figure is completely drawn and you got your guess wrong 6 times(lose).
If you win, your score is sent and highscore table is displayed. Score is calculated as (100/1+(number of errors))

### Additional:

Quotes are pulled from https://api.quotable.io/ (https://github.com/lukePeavey/quotable)
