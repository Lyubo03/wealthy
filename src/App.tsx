import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Navbar from './components/header/Navbar'
import Home from './components/home/Home'
import Stocks from './components/stocks/Stocks'
import Crypto from './components/crypto/Crypto'
import Favorites from './components/favorites/Favorites'

function App() {
  //TODO: Fix the colours
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks" element={<Stocks />} />
        <Route path="/crypto" element={<Crypto />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
      </BrowserRouter>
  )
}

export default App
