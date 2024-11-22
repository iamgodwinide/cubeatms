import Link from 'next/link'
import React from 'react'

const Announcement = () => {
  return (
    <div className='w-full bg-[#e3fc02]'>
        <div className='container'>
            <div className='flex justify-center md:justify-between items-center p-2'>
                <div className='hidden md:flex gap-4 items-center text-xs'>
                    <Link href="/">
                        <ion-icon name="logo-facebook"></ion-icon>
                    </Link>
                    <Link href="/">
                        <ion-icon name="logo-instagram"></ion-icon>
                    </Link>
                    <Link href="/">
                        <ion-icon name="logo-youtube"></ion-icon>
                    </Link>
                    <Link href="/">
                        <ion-icon name="logo-pinterest"></ion-icon>
                    </Link>
                </div>
                <div className='font-bold text-xs'>
                    NEW ATMS HAVE ARRIVED 🚀 SHOP NOW
                </div>
                <div/>
            </div>
        </div>
    </div>
  )
}

export default Announcement