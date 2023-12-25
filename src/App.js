import { Provider } from 'react-redux';
import Hangman from './screens/HangmanFrame';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Hangman />
    </Provider>
  );
}

export default App;
