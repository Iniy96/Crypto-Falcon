import './App.css';
import Header from './components/Header';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from './components/homePage/HomePage';
import CoinPage from './components/coinPage/CoinPage';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={ <HomePage/> }/>
        <Route path='/coin/:id' element={ <CoinPage/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
