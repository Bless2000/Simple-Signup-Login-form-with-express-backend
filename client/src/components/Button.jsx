import React from 'react'

const Button = ({ text }) => {
  return (
    <div>
        <button className='bg-green-700 text-white px-4 py-2 rounded'  type='submit'>
            {text}
        </button>
    </div>
  )
}

export default Button
