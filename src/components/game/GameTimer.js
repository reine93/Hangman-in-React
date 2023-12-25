import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTime } from '../../redux/gameState';

function GameTimer({ onGameEnd, reset, onGameReset }) {
  const [timeTick, setTimeTick] = useState(0);
  const { gameWon, gameLost } = useSelector((state) => state.game);
  const dispatch = useDispatch();
  const intervalID = useRef(null);

  const handleTimer = () => {
    setTimeTick((prev) => prev + 1000);
  };

  useEffect(() => {
    if (reset) {
      clearInterval(intervalID.current);
      setTimeTick(0);
      onGameReset();
    } else if (!reset) { // default
      intervalID.current = setInterval(handleTimer, 1000);
      return () => clearInterval(intervalID.current);
    }
  }, [reset]);

  useEffect(() => {
    if (gameWon) {
      dispatch(addTime(timeTick));
      clearInterval(intervalID.current);
      onGameEnd();
    } else if (gameLost) {
      clearInterval(intervalID.current);
    }
  }, [gameWon, gameLost]);

  return (
    <div>
      <span>Time elapsed: </span>
      <span className="inline-block min-w-[50px] text-left">{Math.floor(timeTick / 1000)}</span>
    </div>
  );
}

export default GameTimer;
