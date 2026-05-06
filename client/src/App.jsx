import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'   // <-- IMPORT FIXED
import Movie from './pages/Movie'
import Home from './pages/Home'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorite from './pages/Favorite'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import Footer from './components/Footer'
import Favourite from './pages/Favorite'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'


const App = () => {

  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  const {  user } = useAppContext() 

  return (
    <>
      <Toaster />

      {/* Admin routes me Navbar or Footer hide */}
      {!isAdminRoute && <Navbar />}

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movie />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route path='/admin/*' element={user ? <Layout/> : (
          <div className='min-h-screen flex justify-center items-center'>
            <SignIn fallbackRedirectUrl={'/admin'} />
          </div>
        )}>
           <Route index element={<Dashboard/>}/> 
           <Route path="add-shows" element={<AddShows/>}/> 
           <Route path="list-shows" element={<ListShows/>}/> 
           <Route path="list-bookings" element={<ListBookings/>}/> 
        
        </Route>
               
      </Routes>
      <Favourite/>

      {!isAdminRoute && <Footer />}
      
      
    </>
  )
}

export default App
