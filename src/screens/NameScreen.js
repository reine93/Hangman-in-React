import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { changePlayerName } from '../redux/gameState'
import InputField from '../components/page-element/InputField'
import Button from '../components/page-element/Button'

function EnterNameForm ({ startGame }) {
  const [inputText, setInputText] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(changePlayerName(inputText))
    startGame()
  }

  return (
        <form className='flex justify-center flex-col items-center' onSubmit = {handleSubmit}>
            <InputField
            value = {inputText}
            onChange = {(e) => { setInputText(e.target.value)}}
            nameInput
            />
            <Button primary >Start game!</Button>
        </form>
  )
}

export default function NameScreen ({ startGame }) {
  return (
    <>
        <p>Please enter your name:</p>
        <EnterNameForm startGame = {startGame}/>
    </>
  )
}
