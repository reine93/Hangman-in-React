function GameBox({children}) {

const gameBoxStyling = 'inline-flex flex-col items-center justify-center border px-20 py-5 min-w-[600px] min-h-[500px]'

  return (
    <div className = {gameBoxStyling}>{children}</div>
  )
}

export default GameBox