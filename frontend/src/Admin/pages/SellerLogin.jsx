import React, { useContext, useState } from 'react'
import Input from '../../commonPages/input'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { ProfileContext } from '../../context/ProfileContext';
function SellerLogin({ setToken }) {
  const navigate = useNavigate();
  const [currentState, setCurrentState] = useState('LogIn');
  const { profileLocation, setProfileLocation } = useContext(ProfileContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (currentState == 'LogIn') {
      await login()
    }
    else {
      await registration();
    }

  }

  function GotoBuyer() {
    localStorage.setItem('Profile', 'Buyer');
    setProfileLocation('Buyer')
    // window.location.reload()

  }

  const login = async () => {
    await axios.post(import.meta.env.VITE_API_URL + '/admins/login',
      {
        email,
        password
      }).then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message)
          localStorage.setItem('Token', response.data.token);
          navigate('/add');
          setToken(response.data.token)
        }
        else {
          toast.error(response.data.message)
        }
      }).catch((error) => {
        console.error(error);

      });
    await clear();
  }

  const registration = async () => {
    await axios.post(import.meta.env.VITE_API_URL + '/admins/register',
      {
        name,
        email,
        password
      }).then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message)
          setCurrentState('LogIn')

        }
        else {
          toast.error(response.data.message)
        }
      }).catch((error) => {
        console.error(error);

      });
    await clear();
  }

  const clear = async () => {
    setName('');
    setEmail('');
    setPassword('');
  }
  return (
    <div className='h-screen  flex justify-center items-center  border-gray-400 border m-auto px-2 '>
      <div className='max-w-md shadow-md rounded-md flex flex-col px-5 sm:pl-8 sm:pr-15 py-8 justify-start items-start'>
        <div className='inline-flex gap-2 mx-auto items-center '>
          <h2 className='text-lg sm:text-xl font-semibold text-gray-800 uppercase'>Seller Panel</h2>
          <p className='w-5 sm:w-10 h-0.5 bg-gray-800'></p>
        </div>

        <form onSubmit={handelSubmit} >
          {currentState == 'SignIn' &&
            <Input type={'text'} getValue={name} setValue={setName} placeHolder={'Enter Name '} isRequired={true} />}
          <Input type={'email'} getValue={email} setValue={setEmail} placeHolder={'Enter Email '} isRequired={true} />
          <Input type={'password'} getValue={password} setValue={setPassword} placeHolder={'Enter Password '} isRequired={true} />
          <div className='w-full flex justify-between items-center mt-2'>
            {currentState == 'LogIn' ? <span className='text-xs sm:text-sm text-gray-700 text-start font-semibold cursor-pointer '>Forgot Your Password?</span> : <span className='text-sm text-gray-700 text-start font-semibold'>Have you already account :- </span>}
            {currentState == 'SignIn' && <span className='text-xs sm:text-sm text-blue-700 text-start font-semibold cursor-pointer' onClick={() => setCurrentState('LogIn')}>Login Here</span>}
            {currentState == 'LogIn' && <span className='text-xs sm:text-sm text-blue-700 text-start font-semibold cursor-pointer' onClick={() => setCurrentState('SignIn')}>Create new Account</span>}
          </div>
          <div className='flex flex-col sm:flex-row items-center justify-center gap-2 mt-10'>
            <button type='submit' className='px-8 py-1 bg-blue-800 text-white text-lg font-medium  cursor-pointer'>
              {currentState == 'SignIn' ? 'Sign In' : 'Log In'}
            </button>
            <button type='button' className='px-4 py-1 bg-green-700 text-white text-lg font-medium cursor-pointer' onClick={() => { GotoBuyer() }}>
              Go to buyer
            </button>
          </div>
        </form>

      </div>

    </div>
  )
}

export default SellerLogin
