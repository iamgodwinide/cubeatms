"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import products from '@/constants/products'
import Announcement from "@/components/Annoucement/Announcement";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";



const page = () => {
  const [sortOption, setSortOption] = useState('featured');

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case 'az':
        return a.name.localeCompare(b.name);
      case 'za':
        return b.name.localeCompare(a.name);
      case 'low-high':
        return a.price - b.price;
      case 'high-low':
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <>
            <Announcement/>
            <Navbar/>
    <div className='container'>
        <h1 className='text-white text-2xl font-bold mt-20 md:text-5xl md:mt-40 mb-5'>Products</h1>

        {/* filters and sort */}
        <div className='flex justify-between items-center mt-20'>
            <button className='flex items-center gap-2 text-xs md:text-sm text-[#e3fc02]'>
                <ion-icon name="options-outline"></ion-icon>
                <span>Filter</span>
            </button>

            <div className='flex items-center gap-2 text-white text-xs md:text-sm'>
                <div>Sort by:
                    <select
                      className='bg-transparent border border-transparent focus:border-white focus:border px-2 py-1 mx-2'
                      value={sortOption}
                      onChange={(e) => setSortOption(e.target.value)}
                    >
                        <option value="featured">Featured</option>
                        <option value="az">Alphabetically, A-Z</option>
                        <option value="za">Alphabetically, Z-A</option>
                        <option value="low-high">Price, low to high</option>
                        <option value="high-low">Price, high to low</option>
                    </select>
                </div>
                <div>{sortedProducts.length} products</div>
            </div>
        </div>

        {/* products */}
        <div className='flex flex-col md:flex-row items-center md:items-start gap-10 mt-10'>
            {
                sortedProducts.map((p, key) => (
                    <Link href={"/catalog/"+p.slug} key={key}>
                        <div className='w-60'>
                            <Image src={p.image} alt={p.name} width={200} height={200} className='w-full h-72' />
                            <div className='w-3/2 px-2 my-4'>
                                <h2 className='text-white text-lg font-bold hover:underline'>{p.name}</h2>
                                <h4 className='text-white text-md my-2'>${p.price.toFixed(2)}</h4>
                            </div>
                        </div>
                    </Link>
                ))
            }
        </div>
    </div>
    <Footer/>
    </>
  )
}

export default page