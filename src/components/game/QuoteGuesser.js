import Button from '../page-element/Button'
import InputField from '../page-element/InputField'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { incrementErrorNum, updateGuessArr, updateErrorMsg, addGuessedLetter, winGame, loseGame } from '../../redux/gameState'
import { guessPattern } from '../../constants'

function QuoteGuesser ({ loading }) {
  const [inputValue, setInputValue] = useState('')
  const { guessQuote, quoteArr, usedLetters, errorMessage, gameWon, gameLost, errorNum } = useSelector(state => state.game)
  const dispatch = useDispatch()

  const handleLetterInput = (e) => {
    const letter = e.target.value.toLowerCase()
    setInputValue(letter)
    if (!letter) {
      dispatch(updateErrorMsg(''))
    } else if (!guessPattern.test(letter)) {
      dispatch(updateErrorMsg('Alphabet characters only'))
    } else if (usedLetters.includes(letter)) {
      dispatch(updateErrorMsg('You have used this character already'))
    } else {
      dispatch(updateErrorMsg(''))
    }
  }

  const handleGuess = (e) => {
    e.preventDefault();
    const guessedLetter = inputValue;
  
    if (quoteArr.some(char => char.toLowerCase() === guessedLetter)) {
      const newGuessQuote = guessQuote.map((item, index) => //store local state in new var
        quoteArr[index].toLowerCase() === guessedLetter ? quoteArr[index] : item
      );
      dispatch(updateGuessArr(newGuessQuote));
        if (quoteArr.toString() === newGuessQuote.toString()) { //compare updated state that is set in stored in new var
        dispatch(winGame());
      }
    } else {
      dispatch(updateErrorMsg('Wrong guess'));
      const currErrorNum = errorNum + 1
      dispatch(incrementErrorNum());
      if (currErrorNum >= 6) { //Condition for game lost
        dispatch(loseGame())
      }
    }
    dispatch(addGuessedLetter(guessedLetter));
    setInputValue('');
  }


  const renderQuoteGuesser = () => {
    return (
      <div className='flex justify-center flex-col items-center gap-y-2'>
        <div>{gameWon ? guessQuote.join('') : guessQuote.join(' ')}</div>
        {usedLetters.length > 0 ? <p>Used letters: {usedLetters.join(', ')}</p> : <p>Type your first letter below</p>}
        {gameLost
          ? <p>You lost the game!</p>
          : gameWon
            ? <p>You won the game!</p>
            : <form onSubmit={handleGuess} className='flex justify-center flex-col items-center'>
                    <InputField
                      type="text"
                      name="guessForm"
                      maxLength={1}
                      onChange={handleLetterInput}
                      value = {inputValue}
                      letterInput />
                    <Button disabled={!inputValue || !!errorMessage} success>Guess!</Button>
                  </form>
        }
      </div>
    )
  }

  return (
<div className='flex justify-center flex-col items-center'>
    <p>Guess a quote!</p>
    {loading ? <p>Loading</p> : renderQuoteGuesser()}
</div>
  )
}

export default QuoteGuesser
