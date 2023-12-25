import { useEffect, useState, useRef } from 'react';
import { getHighscoreData } from '../../api';

function HighscoreTable() {
  const [highScores, setHighScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const tableRef = useRef(null);

  useEffect(() => {
    const handleFetchHighscores = async () => {
      setLoading(true);
      const data = await getHighscoreData();
      const sortedScores = sortHighscores(data);
      setHighScores(sortedScores);
      setLoading(false);
    };
    handleFetchHighscores();
  }, []);

  useEffect(() => {
    if (!loading && tableRef.current) {
      tableRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
      });
    }
  }, [loading]);

  const sortHighscores = (data) => {
    const calculateScore = (player) => (100 / (1 + player.errors)).toFixed(2);
    const scores = data.map((player) => ({
      username: player.userName,
      score: calculateScore(player),
    }));
    scores.sort((a, b) => b.score - a.score);
    return scores;
  };

  const renderedHighscores = () => highScores.map((item, index) => (
    <tr key={index} className="bg-indigo-400 border-b">
      <td className="py-4 px-6">{item.username}</td>
      <td className="py-4 px-6">{item.score}</td>
    </tr>
  ));

  return (
    <div className="highscore-table">
      <p id="highscore-header" className="text-center">Highscores</p>
      {loading
        ? <p>Loading..</p>
        : (
          <table className="w-full text-sm text-left text-white" ref={tableRef}>
            <thead className="bg-indigo-500 text-xs text-white uppercase ">
              <tr>
                <th className="py-3 px-6">Username</th>
                <th className="py-3 px-6">Score</th>
              </tr>
            </thead>
            <tbody id="HStable-rows">
              {renderedHighscores()}
            </tbody>
          </table>
        )}
    </div>
  );
}

export default HighscoreTable;
