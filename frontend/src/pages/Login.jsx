import React, { useState } from 'react'

function Login() {
  const [currentState, setCurrentState] = useState('LogIn');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [passwprd, setPassword] = useState('');

  const handelSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      passwprd
    }
    console.log(data);
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
        {currentState == 'SignIn' && <input type='text' placeholder='Name' className='w-full px-3 py-2 border outline-none border-gray-400 mt-5 text-lg text-gray-700' value={name} onChange={(e) => setName(e.target.value)} required />}
        <input type='email' placeholder='Email' className='w-full px-3 py-2 border outline-none border-gray-400 mt-5 text-lg text-gray-700' value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type='text' placeholder='Password' className='w-full px-3 py-2 border outline-none border-gray-400 mt-5 text-lg text-gray-700' value={passwprd} onChange={(e) => setPassword(e.target.value)} required />
        <div className='w-full flex justify-between items-center mt-2'>
          {currentState == 'LogIn' ? <span className='text-sm text-gray-700 text-start font-semibold cursor-pointer '>Forgot Your Password?</span> : <span className='text-sm text-gray-700 text-start font-semibold'>Have you already account :- </span>}
          {currentState == 'SignIn' && <span className='text-sm text-gray-700 text-start font-semibold cursor-pointer' onClick={() => setCurrentState('LogIn')}>Login Here</span>}
          {currentState == 'LogIn' && <span className='text-sm text-gray-700 text-start font-semibold cursor-pointer' onClick={() => setCurrentState('SignIn')}>Create new Account</span>}
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
