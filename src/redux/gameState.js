import { createSlice } from '@reduxjs/toolkit';
import { guessPattern } from '../constants';

const initialState = {
  playerName: undefined,
  quoteId: undefined,
  quoteLen: undefined,
  uniqueChars: undefined,
  quoteArr: [],
  guessQuote: [],
  timeElapsed: 0,
  errorNum: 0,
  usedLetters: [],
  errorMessage: '',
  gameWon: false,
  gameLost: false,
};

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    changePlayerName: (state, action) => {
      state.playerName = action.payload;
    },
    updateGuessArr: (state, action) => {
      state.guessQuote = action.payload;
    },
    incrementErrorNum: (state) => {
      state.errorNum += 1;
    },
    updateErrorMsg: (state, action) => {
      state.errorMessage = action.payload;
    },
    addGuessedLetter: (state, action) => {
      state.usedLetters = [...state.usedLetters, action.payload];
    },

    addTime: (state, action) => {
      state.timeElapsed += action.payload;
    },
    winGame: (state) => {
      state.gameWon = true;
    },
    loseGame: (state) => {
      state.gameLost = true;
    },
    resetGameState: (state) => {
      state.quoteId = undefined;
      state.quoteLen = undefined;
      state.uniqueChars = undefined;
      state.timeElapsed = 0;
      state.errorNum = 0;
      state.usedLetters = [];
      state.errorMessage = '';
      state.gameWon = false;
      state.gameLost = false;
    },

    generateNewQuote: (state, action) => {
      const quoteString = action.payload.content;
      state.quoteArr = quoteString.split('').map((char) => {
        if (char === ' ') {
          return '\u00A0'; // returns space
        }
        return char;
      });
      state.guessQuote = state.quoteArr.map((char) => {
        if (guessPattern.test(char)) {
          return '_';
        }
        return char;
      });
      state.addQuoteId = action.payload._id;
      state.addQuoteLen = action.payload.length;
      state.uniqueChars = [...new Set(state.quoteArr)].filter((char) => guessPattern.test(char)).length;
    },
  },
});

export const {
  updateGuessArr,
  changePlayerName,
  incrementErrorNum,
  updateErrorMsg,
  addGuessedLetter,
  addTime,
  winGame,
  loseGame,
  resetGameState,
  generateNewQuote,
} = gameSlice.actions;

export default gameSlice.reducer;
