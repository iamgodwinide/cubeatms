"use client"

import Contact from '@/components/Contact/Contact'
import Subscribe from '@/components/Subscribe/Subscribe'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import useCart from '@/store/useCart'
import products from '@/constants/products'
import Announcement from "@/components/Annoucement/Announcement";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";


/**
 * Renders the homepage component which includes various sections such as
 * introduction, multi-currency support, administrative backend, ATM customization,
 * technical specifications, and purchasing options. It also includes an "Add to cart"
 * functionality, a video section with play functionality, and contact and subscribe
 * components.
 */
const homepage = () => {
  const { addItem, updateQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [isplaying, setIsplaying] = useState(false);

  const product = products[0]

  const handleAddToCart = async () => {
    setIsLoading(true)
    try {
      // Simulate API call with 3 second delay
      await new Promise(resolve => setTimeout(resolve, 3000))
      addItem({ ...product, quantity })
      setQuantity(1)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
    <Announcement/>
    <Navbar/>
    <div>
      <div className='container mt-20 flex flex-col-reverse md:flex-row items-center gap-5'>
        <div>
          <h1 className='text-white text-3xl md:text-5xl font-bold mb-4'>FREEDOM TO ESCAPE</h1>
          <p className='text-white text-xs mb-2 leading-5'>
            Cube ATM is on a mission to bring Bitcoin to the developing world by offering an affordable, royalty-free solution for converting fiat currency into Bitcoin. We’re revolutionizing financial access, one transaction at a time, by providing the most cost-effective Bitcoin ATMs on the market.
          </p>
          <p className='text-white text-xs mb-2 leading-5'>
            For detailed setup instructions and software demos, subscribe to our Cube ATM <Link className='text-[#e3fc02] underline' href="https://cubeatms.substack.com/">Substack</Link>. To see our ATMs in action, visit our <Link className='text-[#e3fc02] underline' href="https://youtube.com/playlist?list=PLEh1TuNoHd_iSrFFLmjxrC3Q8l1ULmeeF&si=klcNEELyGR8J25uE">Youtube</Link> channel or join our <Link className='text-[#e3fc02] underline' href="https://t.me/BitcoinCapitalist">Telegram</Link> group. All other links can be found <Link className='text-[#e3fc02] underline' href="https://linktr.ee/bitcoincapitalist">here</Link>.
          </p>
          <p className='text-white text-xs mb-2 leading-5'>
            Join our <Link className='text-[#e3fc02] underline' href="https://af.uppromote.com/bitcoin-capitalist/register">affiliate program</Link> and get 10% off any sale.
          </p>
          <Link href="/catalog" className='inline-block bg-[#e3fc02] text-black text-xs mt-6 px-6 py-3 transition-transform hover:scale-105'>
            Buy Cube ATM
          </Link>
        </div>
        <Image
          alt='cubeatms'
          src={'/atm1.webp'}
          height={700}
          width={500} 
        />
      </div>
      
      <br/>

      {/* multi-currency */}
      <div className='container flex flex-col md:flex-row items-center gap-5 mt-10'>
        <Image
          alt='cubeatms'
          src={'/ATM_home_screen.webp'}
          height={300}
          width={500} 
        />
        <div>
          <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>Multi-Cryptocurrency Support</h1>
          <p className='text-white text-xs mb-2 leading-5'>
          Our Bitcoin ATMs are designed to support a wide range of cryptocurrencies, including Bitcoin, Ethereum, USDT (ERC-20 & TRC-20), Bitcoin Cash, Litecoin, Zcash, Monero, Dash, and Tron. Operators have full control over which cryptocurrencies to enable through the easy-to-use administrative backend.
          </p>
        </div>
      </div>

      <br/>

      {/* administrative backend */}
      <div className='container flex flex-col-reverse md:flex-row items-center gap-5 mt-10'>
        <div>
          <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>Administrative Backend</h1>
          <p className='text-white text-xs mb-2 leading-5'>
          As an operator, you’ll have full, exclusive control over your machine through our decentralized backend. Easily adjust commissions or set fixed fees, modify compliance limits in real-time, publish your machine's location on CoinATMRadar, and choose between running a full-node cryptocurrency wallet or using a hosted option.
          </p>
        </div>
        <Image
          alt='cubeatms'
          src={'/admin.webp'}
          height={300}
          width={500} 
        />
      </div>

      <br/>

      {/* customize atm */}
      <div className='container flex flex-col md:flex-row items-center gap-5 mt-10'>
        <Image
          alt='cubeatms'
          src={'/customize.webp'}
          height={300}
          width={500} 
        />
        <div>
          <h1 className='text-white text-3xl md:text-4xl font-bold mb-4'>Customize ATM</h1>
          <p className='text-white text-xs mb-2 leading-5'>
          Purchase 10 or more Cube ATMs and get them customized with your company's logo and colors for enhanced brand visibility.
          </p>
        </div>
      </div>

      <h2 className='text-white text-center text-2xl font-bold mt-10'>Technical Specifications</h2>
      <h3 className='text-white text-center text-lg md:text-2xl font-medium my-1'>Size, weight and features</h3>

      <br/>

      {/* specifications */}
      <div className='container flex flex-col md:flex-row items-center gap-5 md:gap-20 mt-10'>
        <Image
          alt='cubeatms'
          src={'/specifications.webp'}
          height={300}
          width={500} 
        />
        <div>
         <ul className='list-disc text-white text-xs'>
            <li>Weight: 50 lbs</li>
            <li>Body Material 1.5mm steel</li>
            <li>Screen 10.1"</li>
            <li>Supported languages: Any language</li>
            <li>Supported currencies: All (99%)</li>
            <li>Cash box capacity: 600 Notes</li>
            <li>Network Connections: Ethernet/ Wi-Fi</li>
            <li>Cash Acceptor: SCN8328R</li>
         </ul>
        </div>
      </div>


      <br/>
      <br/>

      {/* add to cart */}
      <div className='container justify-center flex flex-col md:flex-row items-center gap-5 md:gap-40 mt-10'>
        <Image
          alt='cubeatms'
          src={'/atm1.webp'}
          height={500}
          width={300} 
        />
        <div>
          <p className='text-xs text-white'>CUBE ATM</p>
          <h3 className='text-white text-3xl md:text-4xl font-bold'>Cube Bitcoin ATM</h3>
          <p className='text-white text-xs font-bold my-1'>$3,600.00</p>
          {/*  */}
          <p className='text-white text-xs mt-7 mb-2'>Quantity</p>
          <div className='flex items-center justify-center gap-4 border border-white px-2 py-1 w-full md:w-2/6 mt-4'>
            <button 
              className='text-white'
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={isLoading}
            >
              <ion-icon name="remove-outline"></ion-icon>
            </button>
            <p className='text-white'>{quantity}</p>
            <button 
              className='text-white'
              onClick={() => setQuantity(quantity + 1)}
              disabled={isLoading}
            >
              <ion-icon name="add-outline"></ion-icon>
            </button>
          </div>
          <button 
            className='text-sm text-[#e3fc02] border border-[#e3fc02] w-full px-4 py-2 h-10 mt-5 hover:border-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-[#e3fc02] border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Add to cart'
            )}
          </button>
          <Link href="/cart" className=' block  text-center text-sm text-black border bg-[#e3fc02] border-[#e3fc02] w-full px-4 py-2 h-10 mt-5 hover:border-2'>
            Buy it now
          </Link>

          <div className='flex justify-between w-full mt-10 text-[#e3fc02] text-xs'>
            <Link href="/" className='flex items-center gap-2 hover:underline'> 
            <ion-icon name="share-outline"></ion-icon>
            Share</Link>
            <Link href="/" className='flex items-center gap-2 hover:underline'> 
            View full details
            <ion-icon name="arrow-forward-outline"></ion-icon>
            </Link>
          </div>

        </div>
      </div>

      {/* about */}
      <div className='container'>
        <h2 className='text-white text-2xl font-bold mt-20 md:text-5xl md:mt-40 mb-5'>About Cube ATM</h2>
      </div>
      <div className='container relative'>
        <div className='relative flex justify-center items-center w-full'>
          <img src={"/thumbnail.webp"}  alt='cube atms' className='w-full h-full'/>
          <button className='flex justify-center items-center text-white text-2xl w-20 h-20 rounded-full bg-[#1F1F21] absolute'
          onClick={()=> setIsplaying(!isplaying)}
          >
            <ion-icon name="play"></ion-icon>
          </button>
        </div>
        {
          isplaying
          && <iframe src="https://www.youtube.com/embed/vQ2tyj1vm5c?enablejsapi=1&amp;autoplay=1" 
          class="js-youtube z-10 absolute w-full h-full top-0 left-0" allow="autoplay; encrypted-media" allowfullscreen="" title=""></iframe>          
        }
      </div>

      {/* contact form */}
      <Contact/>

      {/* subscribe */}
      <Subscribe/>
    </div>
    <Footer/>
    </>
  )
}

export default homepage