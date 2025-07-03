import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { ShopContextProvider } from './context/ShopContext.jsx';
import { ProfileContextProvider } from './context/ProfileContext.jsx';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ProfileContextProvider>
    <ShopContextProvider>
      <App />
    </ShopContextProvider>
    </ProfileContextProvider>
  </BrowserRouter>
)
