import React from 'react'

const Subscribe = () => {
  return (
    <div className='bg-[#e3fc02] mt-10'>
    <div className='container flex flex-col justify-center items-center py-5'>
      <h2 className='text-2xl md:text-4xl font-bold text-black'>SUBSCRIBE TO OUR EMAILS</h2>
      <p className='text-base my-4'>Be the first to know about new collections and exclusive offers.</p>
      <div  className='flex items-center justify-center gap-2 border border-black px-2 py-1 w-full md:w-2/6'>
        <input className='w-full text-sm text-black placeholder-black bg-transparent outline-none border-none p-2' type="email" placeholder="Email" />
        <button>
          <ion-icon name="arrow-forward-outline"></ion-icon> 
        </button>
      </div>
    </div>
  </div>

  )
}

export default Subscribe