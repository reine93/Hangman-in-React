import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendHighscore, fetchQuote } from '../api.js';
import { resetGameState, generateNewQuote} from '../redux/gameState.js';
import UserInfo from '../components/game/UserInfo';
import HangmanDraw from '../components/game/HangmanDraw';
import QuoteGuesser from '../components/game/QuoteGuesser';
import GameTimer from '../components/game/GameTimer.js';
import HighscoreTable from '../components/game/HighscoreTable.js';
import Button from '../components/page-element/Button.js';

function GameScreen() {
  const [loading, setLoading] = useState(true);
  const [timeUpdated, setTimeUpdated] = useState(false)
  const {
    errorNum, playerName, quoteId, uniqueChars, quoteLen, timeElapsed, gameWon, gameReset
  } = useSelector((state) => state.game);
  const dispatch = useDispatch();

  useEffect(() => {
    handleFetchQuote(); // Generate new quote on first render
  }, []);

  useEffect(() => {
    if (gameWon && timeUpdated) { //once game won and elapsed time from timer has been updated, send highscore and set timeUpdated back to false 
      sendHighscore(quoteId, quoteLen, uniqueChars, playerName, errorNum, timeElapsed);
      setTimeUpdated(false)
    }
  }, [timeUpdated]);

  const handleFetchQuote = async () => {
    setLoading(true);
    const data = await fetchQuote();
    dispatch(generateNewQuote(data));
    setLoading(false);
  };

  const handleGameEnd = () => { //makes sure elapsed time has been updated from timer function(dispatch)
    setTimeUpdated(true); //update state
  };

  const handleReset = () => {
    dispatch(resetGameState());
    handleFetchQuote();
  };


  return (
    <div className="flex flex-col items-center gap-y-1 min-w-[500px]">
      <div className="flex justify-between w-full px-4">
        <UserInfo />
        <GameTimer reset={gameReset} onGameEnd={handleGameEnd} />
      </div>
      <div className="flex flex-col items-center gap-y-1">
        <HangmanDraw />
        <QuoteGuesser loading={loading} />
        <Button className="reset-btn" danger onClick={handleReset}>Reset</Button>
        {gameWon && <HighscoreTable />}
      </div>
    </div>
  );
}

export default GameScreen;
