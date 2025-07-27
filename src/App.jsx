import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PortfolioOne from './PortfolioOne'
import Blog from './Blog'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AnimatedContactForm from './Contact'
import Header from './Header'
import Footer from './Footer'
// import Admin from './Admin/Admin'
// import Layout from './Layout'
// import Landing from './Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
 <>
    <BrowserRouter>
    <Header/>
      <Routes>
     
        <Route path="/" element={<Blog />} />
   <Route path="/contact" element={<AnimatedContactForm />} />
       
      </Routes>
      <Footer/>
    </BrowserRouter>

 </>
  )
}

export default App
