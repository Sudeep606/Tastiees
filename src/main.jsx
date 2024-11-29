import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './Context/Cart.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import { FavProvider } from './Context/Fav.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
  
      <FavProvider>
         <CartProvider>
         <BrowserRouter> 
         <App />
         </BrowserRouter>
        </CartProvider>
      </FavProvider>
      
  </StrictMode>,
)
