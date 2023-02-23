import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <div className="container">
        <Routes>
          <Route path="/" index element={<Main/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
