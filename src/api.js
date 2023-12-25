import axios from 'axios';

const fetchQuote = async () => {
  const getQuoteUrl = 'https://api.quotable.io/random';
  const maxLength = 30;

  try {
    const response = await axios.get(`${getQuoteUrl}?maxLength=${maxLength}`);
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendHighscore = async (quoteId, length, uniqueCharacters, userName, errors, duration) => {
  const highscoresURL = 'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores';
  try {
    await axios.post(highscoresURL, {
      quoteId,
      length,
      uniqueCharacters,
      userName,
      errors,
      duration,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getHighscoreData = async () => {
  const highscoresURL = 'https://my-json-server.typicode.com/stanko-ingemark/hang_the_wise_man_frontend_task/highscores';
  try {
    const response = await axios.get(highscoresURL);
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchQuote, sendHighscore, getHighscoreData };
