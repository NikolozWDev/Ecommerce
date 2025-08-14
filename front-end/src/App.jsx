import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/homepage/Home'
import Shop from './pages/shoppage/Shop';

const App = () => {

  return (

    <Router>
      
      <Navbar />
      <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
      </Routes>
      </div>
      <Footer />

    </Router>

  )

}
export default App