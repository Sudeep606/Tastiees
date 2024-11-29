import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Favourites from './Pages/Favourites'
import Cart from './Pages/Cart'
import Header from './Components/Header'
import Footer from './Components/Footer'
function App() {
  return (
    <>
    <Header/>
<Routes>
  <Route path='/' element={<Home/>}/>
  <Route path='/cart' element={<Cart/>}/>
  <Route path='/favourites' element={<Favourites/>}/>
</Routes>
<Footer/>
    </>
  )
}

export default App
