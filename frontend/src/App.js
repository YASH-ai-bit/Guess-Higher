import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.js";
import GamePage from "./pages/GamePage.js";
import ResetPage from "./pages/ResetPage.js";

function App() {
  return (
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/reset" element={<ResetPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
