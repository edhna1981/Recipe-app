
import { Route,Routes } from 'react-router-dom'
import './App.css'

import Home from './Pages/Home'
import AddRecipe from './Pages/AddRecipe'




function App() {
  
  return (
    <>
   
      <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/add" element={<AddRecipe />} />
      </Routes>
    
    </>
  )
}

export default App
