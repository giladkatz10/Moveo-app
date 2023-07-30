import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LobbyPage from './components/Lobby';
import CodeBlockPage from './components/CodeBlock';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<LobbyPage/>} />
          <Route path="/code-block/:id" element={<CodeBlockPage/>} />
        </Routes>
      </Router>
    </div>
    );
}

export default App;