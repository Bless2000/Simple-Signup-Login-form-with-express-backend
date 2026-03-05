import React from 'react'

const AuthForm = ({ title, children }) => {
  return (
    <div className='w-full max-w-xs mx-auto mt-10 bg-slate-300 p-12 rounded-lg shadow-md mb-8'>

      <h2 className='text-2xl font-bold text-center mb-6'>{title}</h2>

      {children}

    </div>
  )
}

export default AuthForm
