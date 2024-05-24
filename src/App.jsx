import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Registartion from './Components/Registartion'
import Login from './Components/Login'
import Home from './Components/Home'

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
    
      <Route path='/' element={<Registartion/>} ></Route>
      <Route path='/Login' element={<Login/>} ></Route> 
      <Route path='/Home' element={<Home/>} ></Route>

      
    </Routes>
    </BrowserRouter>
    
  )
}

export default App
