import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage.js'
import GamePage from './pages/GamePage.js'

function App() {
  return (
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route
            path = '/'
            element = {<HomePage />}
          />
          <Route
          path = '/game'
          element = {<GamePage/>}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
