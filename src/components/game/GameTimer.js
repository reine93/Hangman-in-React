import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTime, completeGameReset } from '../../redux/gameState';

function GameTimer({ onGameEnd }) {
  const startTime = useRef(Date.now())
  const [elapsedTime, setElapsedTime] = useState(0)
  const { gameWon, gameLost, gameReset } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const intervalID = useRef(null);

  const handleTimer = () => {
    setElapsedTime(Date.now() - startTime.current);
  };

  useEffect(() => {
    if (gameReset || gameWon || gameLost) { //always clear interval if one of the states changes
      clearInterval(intervalID.current);
      if (gameReset) {
        setElapsedTime(0); 
        dispatch(completeGameReset()); //set game reset back to false as timer has been reset
      }
      if (gameWon) {
        dispatch(addTime(elapsedTime));
        onGameEnd();
      }
    } else {
      //default
      startTime.current = Date.now();
      intervalID.current = setInterval(handleTimer, 1000);
    }

    return () => clearInterval(intervalID.current);
  }, [gameReset, gameWon, gameLost]);


  return (
    <div>
      <span>Time elapsed: </span>
      <span className="inline-block min-w-[50px] text-left">{Math.round(elapsedTime / 1000)}</span>
    </div>
  );
}

export default GameTimer;
