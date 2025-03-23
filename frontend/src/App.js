import {BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage.js'

function App() {
  return (
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route
            path = '/'
            element = {<HomePage />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
