import React from 'react'
// import Navbar from './components/Navbar'
// import Footer from './components/Footer'
import Header from './Header'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
function Layout() {
  return (
    <>
       <Header/>

    {/* <About/> */}
     <Outlet/>
    <Footer/>
    </>
  )
}

export default Layout