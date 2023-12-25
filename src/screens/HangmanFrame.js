import GameScreen from './GameScreen'
import NameScreen from './NameScreen'
import GameBox from '../components/page-element/GameBox'
import { useState } from 'react'

function Hangman () {
  const [gameStart, setGameStart] = useState(false)
  const title = 'Hang the wise man'
  const titleStyling = "text-center m-8 font-title text-5xl"

  const startGame = () => {
    setGameStart(true)
  }

  return (
 <div className='bg-indigo-300 min-h-screen min-w-screen'>
  <div className = "flex justify-center flex-col items-center">
      <h1 className = {titleStyling}>{title}</h1>
      <GameBox>
        {gameStart ? <GameScreen /> : <NameScreen startGame = {startGame} />}
      </GameBox>
  </div>
</div>
  )
}

export default Hangman
