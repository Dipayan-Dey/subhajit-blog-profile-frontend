import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import PortfolioOne from './PortfolioOne'
import Blog from './Blog'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import AnimatedContactForm from './Contact'
import Admin from './Admin/Admin'
import Layout from './Layout'
import Landing from './Landing'

function App() {
  const [count, setCount] = useState(0)

  return (
 <>
    <BrowserRouter>
      <Routes>
        {/* First render Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Portfolio Pages wrapped in Layout */}
        <Route path="/portfolio" element={<Layout />}>
          <Route index element={<Blog />} />
          <Route path="/portfolio/contact" element={<AnimatedContactForm />} />
        </Route>

        {/* Admin Dashboard – no layout */}
        <Route path="/dashbord" element={<Admin />} />
      </Routes>
    </BrowserRouter>

 </>
  )
}

export default App
