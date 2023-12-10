//import logo from './logo.svg';
import './App.css';
import Main from './components/main.js'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Main></Main>
      </div>
    </BrowserRouter>
  );
}

export default App;
