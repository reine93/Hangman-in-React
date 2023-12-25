import { useSelector } from 'react-redux/es/hooks/useSelector'

function HangmanDraw () {
  const { errorNum } = useSelector(state => state.game)

  const hangman = (
    <svg width="200" height="200" viewBox="0 0 200 200">
    {/* Gallows */}
    <line x1="60" y1="20" x2="140" y2="20" stroke="black" />
    <line x1="140" y1="20" x2="140" y2="50" stroke="black" />
    <line x1="60" y1="180" x2="60" y2="20" stroke="black" />
    <line x1="20" y1="180" x2="100" y2="180" stroke="black" />

    {/* Hangman Body Parts */}
    {/* Head */}
    {errorNum > 0 && <circle cx="140" cy="70" r="20" stroke="black" fill="none" />}
    {/* Body */}
    {errorNum > 1 && <line x1="140" y1="90" x2="140" y2="130" stroke="black" />}
    {/* Left Arm */}
    {errorNum > 2 && <line x1="140" y1="100" x2="120" y2="110" stroke="black" />}
    {/* Right Arm */}
    {errorNum > 3 && <line x1="140" y1="100" x2="160" y2="110" stroke="black" />}
    {/* Left Leg */}
    {errorNum > 4 && <line x1="140" y1="130" x2="120" y2="150" stroke="black" />}
    {/* Right Leg */}
    {errorNum > 5 && <line x1="140" y1="130" x2="160" y2="150" stroke="black" />}
  </svg>
  )

  return (
    <div className='border-dotted border-4 bg-purple-100 bg-opacity-25 rounded-lg'>
        {hangman}
    </div>
  )
}

export default HangmanDraw
