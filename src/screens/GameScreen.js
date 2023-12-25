import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendHighscore, fetchQuote } from '../api.js';
import { resetGameState, generateNewQuote } from '../redux/gameState.js';
import UserInfo from '../components/game/UserInfo';
import HangmanDraw from '../components/game/HangmanDraw';
import QuoteGuesser from '../components/game/QuoteGuesser';
import GameTimer from '../components/game/GameTimer.js';
import HighscoreTable from '../components/game/HighscoreTable.js';
import Button from '../components/page-element/Button.js';

function GameScreen() {
  const [loading, setLoading] = useState(true);
  const [timeUpdated, setTimeUpdated] = useState(false);
  const {
    errorNum, playerName, quoteId, uniqueChars, quoteLen, timeElapsed, gameWon,
  } = useSelector((state) => state.game);
  const [gameReset, setGameReset] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    handleFetchQuote(); // Generate new quote on first render
  }, []);

  useEffect(() => {
    if (gameWon && timeUpdated) {
      console.log('Sending highscore');
      sendHighscore(quoteId, quoteLen, uniqueChars, playerName, errorNum, timeElapsed);
      setTimeUpdated(false);
    }
  }, [timeUpdated]);

  const handleFetchQuote = async () => {
    setLoading(true);
    const data = await fetchQuote();
    dispatch(generateNewQuote(data));
    setLoading(false);
  };

  const handleGameEnd = () => {
    setTimeUpdated(true);
  };

  const handleReset = () => {
    setGameReset(true);
    dispatch(resetGameState());
    handleFetchQuote();
    setTimeUpdated(false);
  };

  const handleTimerReset = () => {
    setGameReset(false);
  };

  return (
    <div className="flex flex-col items-center gap-y-1 min-w-[500px]">
      <div className="flex justify-between w-full px-4">
        <UserInfo />
        <GameTimer reset={gameReset} onGameEnd={handleGameEnd} onGameReset={handleTimerReset} />
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
