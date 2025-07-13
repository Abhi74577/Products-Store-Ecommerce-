import React, { useState, useContext } from 'react'
import Input from '../commonPages/InputBox';
import { ProfileContext } from '../context/ProfileContext';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login({setToken}) {
    const navigate = useNavigate();
  const [currentState, setCurrentState] = useState('LogIn');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const { userData, setUserData} = useContext(ProfileContext);
  // const handelSubmit = async (e) => {
  //   e.preventDefault();
  //   const data = {
  //     name,
  //     email,
  //     password
  //   }
  //   console.log(data);
  //   setName('');
  //   setEmail('');
  //   setPassword('');
  // }
   const handelSubmit = async (e) => {
    e.preventDefault();
    if (currentState == 'LogIn') {
      await login()
    }
    else {
      await registration();
    }

  }



  const login = async () => {
    await axios.post(import.meta.env.VITE_API_URL + '/users/login',
      {
        email,
        password
      }).then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message)
          localStorage.setItem('Token', response.data.token);
          navigate('/');
          setToken(response.data.token)
          setUserData(response.data.user)
        }else{
           toast.error(response.data.message)
        }
      }).catch((error) => {
        console.error(error);

      });
    await clear();
  }

  const registration = async () => {
    await axios.post(import.meta.env.VITE_API_URL + '/users/register',
      {
        name,
        email,
        password
      }).then((response) => {
        if (response.status == 200) {
          toast.success(response.data.message)
          setCurrentState('LogIn')

        }
        else{
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
    <div className='flex my-10 flex-col justify-center items-center mx-auto w-[90%] sm:max-w-100 mt-10 p-2'>
      <div className='inline-flex gap-2 items-center '>
        <h2 className='text-3xl font-medium text-gray-800'>{currentState}</h2>
        <p className='w-10 h-0.5 bg-gray-600'></p>
      </div>
      <form onSubmit={handelSubmit} >
        {currentState == 'SignIn' && 
          <Input type={'text'} getValue={name} setValue={setName} placeHolder={'Enter Name '} isRequired={true} />}
          <Input type={'email'} getValue={email} setValue={setEmail} placeHolder={'Enter Email '} isRequired={true} />
          <Input type={'password'} getValue={password} setValue={setPassword} placeHolder={'Enter Password '} isRequired={true} />
        <div className='w-full flex justify-between items-center mt-2'>
          {currentState == 'LogIn' ? <span className='text-xs sm:text-sm text-gray-700 text-start font-semibold cursor-pointer '>Forgot Your Password?</span> : <span className='text-sm text-gray-700 text-start font-semibold'>Have you already account :- </span>}
          {currentState == 'SignIn' && <span className='text-xs sm:text-sm text-gray-700 text-start font-semibold cursor-pointer' onClick={() => setCurrentState('LogIn')}>Login Here</span>}
          {currentState == 'LogIn' && <span className='text-xs sm:text-sm text-gray-700 text-start font-semibold cursor-pointer' onClick={() => setCurrentState('SignIn')}>Create new Account</span>}
        </div>
        <div className='flex items-center justify-center'>
          <button type='submit' className='px-8 py-1 bg-black text-white text-lg font-medium mt-10 cursor-pointer'>
            {currentState == 'SignIn' ? 'Sign In' : 'Log In'}
          </button>
        </div>

      </form>


    </div>

  )
}

export default Login
