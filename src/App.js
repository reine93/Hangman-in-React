import Hangman from './screens/HangmanFrame'
import store from './redux/store'
import { Provider } from 'react-redux'

function App () {
  return (
     <Provider store = {store}>
        <Hangman />
     </Provider >
  )
}

export default App
