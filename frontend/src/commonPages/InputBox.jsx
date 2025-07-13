import React from 'react'

function InputBox( { type, getValue, setValue, placeHolder, isRequired }) {
  return (
    <input className='w-full px-3 py-1 border outline-none border-gray-400 mt-5 text-sx sm:text-lg  lg:text-lg text-gray-700'
     type={type} value={getValue} placeholder={placeHolder} onChange={(e) => setValue(e.target.value)} required={isRequired}  />
  )
}

export default InputBox
