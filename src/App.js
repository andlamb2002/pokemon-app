import { BrowserRouter } from "react-router-dom";
import { Routes, Route } from "react-router";
import Home from './Pages/Home';
import About from './Pages/About';

function App() {

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/:pokemonId" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;