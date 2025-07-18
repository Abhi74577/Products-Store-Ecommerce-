import './App.css'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Collection from './pages/Collection'
import About from './pages/About'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Login from './pages/Login'
import PlaceOrder from './pages/PlaceOrder'
import Orders from './pages/Orders'
import Navbar from './components/Navbar'
import NavbarAdmin from './Admin/components/Navbar'
import Footer from './components/Footer'
import Search from './components/Search'
import { ToastContainer } from 'react-toastify'
import Contact from './pages/Contact'
import { ProfileContext } from './context/ProfileContext'
import { useContext, useEffect, useState } from 'react'
import Sidebar from './Admin/components/sidebar/Sidebar'
import SellerLogin from './Admin/pages/SellerLogin'
import Add from './Admin/pages/Add'
import List from './Admin/pages/List'
import OrdersList from './Admin/pages/OrdersList'
function App() {
  const { profileLocation, setProfileLocation } = useContext(ProfileContext);
  const data = localStorage.getItem('Profile');
  const [token, setToken] = useState('');


  useEffect(() => {
    if (data == null) {
      localStorage.setItem('Profile', 'Buyer')
      setProfileLocation('Buyer')
    }
  }, [profileLocation, setProfileLocation])

  useEffect(() => {
    const local_token = localStorage.getItem('Token');
    if (local_token == null) {
      setToken('');
    }
    else {
      setToken(local_token);
    }

  }, [token, setToken])

  return (<>
    {
      (profileLocation === 'Buyer') && <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:[9vw]'>
        <ToastContainer position="bottom-center" />
        <Navbar setToken={setToken} token={token}/>
        <Search />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='collection' element={<Collection />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='product/:productId' element={<Product />} />
          <Route path='cart' element={<Cart />} />
          {token == '' ? <Route path='login' element={<Login setToken={setToken} />} /> : <></>}
          <Route path='place-order' element={<PlaceOrder />} />
          <Route path='orders' element={<Orders />} />
        </Routes>
        <Footer /> </div>


    }

    {
      profileLocation != null && profileLocation === 'Seller' &&
      <div className='w-full h-screen px-2 sm:px-4 bg-gray-50'>
        <ToastContainer />
        {
          token == '' ? <SellerLogin setToken={setToken} />
            : <>
              <NavbarAdmin setToken= {setToken} />
              <div className='w-full flex'>
                <Sidebar />
                <div className='w-[100%]'>
                  <Routes>
                  <Route path='/add' element={<Add />} />
                  <Route path='/list' element={<List />} />
                  <Route path='/product-order' element={<OrdersList />} />
                </Routes>
                </div>
                
              </div></>


        }


      </div>
    }
  </>

  )
}

export default App
