import logo from './logo.svg';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Home from './components/Pages/Home';
import './App.css';
import Nav from './components/Header/Nav';
import Footer from './components/Footer/Footer';

function App() {
  return (
      <BrowserRouter>
      <Nav />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
