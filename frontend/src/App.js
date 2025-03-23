import logo from './logo.svg';
import './App.css';

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
