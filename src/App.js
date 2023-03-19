import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import { AuthStorage } from './AuthContext';
import Header from './components/Header/Header';
import Main from './pages/Main/Main';

function App() {
  return (
    <BrowserRouter>
    <AuthStorage>
    <Header/>
      <div className="container">
        <Routes>
          <Route path="/" index element={<Main/>}/>
        </Routes>
      </div>
    </AuthStorage>
    </BrowserRouter>
  );
}

export default App;
