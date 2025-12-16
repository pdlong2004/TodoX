import React from 'react'

const NotFound = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-50'>
      <img 
        src = "404_NotFound.png"
        alt=" 404_NotFound "
        className='max-w-full mb-6 w-96'
      />

      <p className='text-xl font-bold mb-6' > 
        Bạn đang đi vào vùng cấm địa
      </p>

      <a href='/' className='inline-block px-6 py-3 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark ' >Quay về trang chủ </a>
    </div>
  )
}

export default NotFound