"use client"

import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import products from '@/constants/products';
import useCart from '@/store/useCart'
import Link from 'next/link';
import Announcement from "@/components/Annoucement/Announcement";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";



const ProductDetails = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState({});
  const { addItem, updateQuantity } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);;
  const [mainImage, setMainImage] = useState(product?.image || '/atm1.webp');

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

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!slug || !isMounted) return;

    const foundProduct = products.find(p => p.slug === slug);
    setProduct(foundProduct);
    setMainImage(foundProduct.image)
  }, [slug, isMounted]);

  if (!isMounted) {
    return null; 
  }

  if (!product && isMounted) {
    return (<div className='product-details container'>
               <h1 className='text-white text-2xl font-bold mt-20 md:text-5xl md:mt-40 mb-5'>Product not found</h1>
            </div>);
  }
  else return (
    <>
                <Announcement/>
                <Navbar/>
    <div className='product-details container'>
        <div className='flex flex-col md:flex-row gap-10 md:gap-20'>
            <div>
                {/* main image */}
                <Image
                    src={mainImage}
                    alt={product?.name}
                    width={5000}
                    height={600}
                />
                
                {/* gallery */}
                <div className='hidden md:flex gallery gap-2 mt-4 w-full flex-wrap'>
                  {product?.gallery?.map((img, index) => (
                    <img 
                      key={index}
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className='w-20 h-20 cursor-pointer'
                      onClick={() => handleThumbnailClick(img)}
                    />
                  ))}
                </div>
            </div>
        <div>
          <p className='text-xs text-white'>CUBE ATM</p>
          <h3 className='text-white text-3xl md:text-5xl font-bold my-4'>{product?.name}</h3>
          <p className='text-white text-sm font-bold my-1'>${product?.price?.toLocaleString()}.00</p>
          {/*  */}
          <p className='text-white text-xs mt-7 mb-2'>Quantity ({quantity} in cart)</p>
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
          <button className='text-sm text-black border bg-[#e3fc02] border-[#e3fc02] w-full px-4 py-2 h-10 mt-5 hover:border-2'>
            Buy it now
          </button>

          <div className='w-full mt-10'>
            <p className='text-white text-sm'>
            The <b>Cube ATM</b> was designed to bring Bitcoin to emerging markets worldwide, particularly in regions where many people remain unbanked. Engineered to be lightweight, compact, and highly cost-effective, Cube ATMs can be easily shipped anywhere across the globe. Unlike competitors, Cube ATMs operate without any royalty fees and are fully compatible with third-party ATM software. Additionally, we offer a range of services, including ATM software, server hosting, and customer support. At Cube ATM, we are dedicated to promoting financial freedom globally through Bitcoin, and we believe our ATM is a powerful tool in achieving that vision.
            </p>
            <p className='text-white text-sm mt-6'>
                For detailed setup instructions and software demos, subscribe to our Cube ATM <Link className='text-[#e3fc02] hover:underline' href={"https://cubeatms.substack.com/"}>Substack</Link>. To see our ATMs in action, visit our <Link className='text-[#e3fc02] hover:underline' href={"https://youtube.com/playlist?list=PLEh1TuNoHd_iSrFFLmjxrC3Q8l1ULmeeF&si=klcNEELyGR8J25uE"}>YouTube</Link> channel.
            </p>

          <h3 className='text-white text-3xl md:text-5xl font-bold my-10'>Multi-Cryptocurrency Support </h3>
          <p className='text-white text-sm'>
          Our Bitcoin ATMs are designed to support a wide range ofcryptocurrencies, including Bitcoin, Ethereum, USDT (ERC-20 & TRC-20), Bitcoin Cash, Litecoin, Zcash, Monero, Dash, and Tron. Operators have full control over which cryptocurrencies to enable through the easy-to-use administrative backend.
          </p>

          <h3 className='text-white text-3xl md:text-5xl font-bold my-10'>
              Supported Exchanges 
          </h3>

          <ul className='text-white list-disc ml-10'>
            <li>
                Kraken
            </li>
            <li>
                Binance 
            </li>
            <li>
                itbit
            </li>
            <li>
                CEX.IO
            </li>
            <li>
                Bitfinex
            </li>
            <li>
                Bitstamp
            </li>
          </ul>


          <h3 className='text-white text-3xl md:text-5xl font-bold my-10'>
              Supported Wallets
          </h3>

          <ul className='text-white list-disc ml-10'>
            <li>
                Trongrid
            </li>
            <li>
               Bitgo 
            </li>
            <li>
                Galoy
            </li>
            <li>
                Infura/Alchemy
            </li>
          </ul>

          <p className='text-white font-bold my-6'>Details</p>
          <ul className='text-white list-disc ml-10'>
            <li>
                Order 10+ we can custom design atm's 
            </li>
            <li>
                Designed to be wall-mounted or table-mounted
            </li>
            <li>
                Cash box holds 600 Bank notes
            </li>
            <li>
                5-7 Week production time
            </li>
            <li>
                Machines ship Worldwide from factory in China
            </li>
            <li>
                Third party software integration allowed  
            </li>
            <li>
                Software available - $50/ Month licensing fee - No Royalties
            </li>
            <li>
                Shipping fees & import tax not included 
            </li>
            <li>
                Accepts 99% of currencies
            </li>
          </ul>


          <p className='text-white font-bold my-6'>Specifications </p>
          <ul className='text-white list-disc ml-10'>
            <li>
                Weight - 50 Lbs
            </li>
            <li>
                Material - 1.5mm Cold-Roll Steel Frame 
            </li>
            <li>
                Operating System - Linux - Xubuntu 20.04LTS
            </li>
            <li>
                Computer - Intel® Celeron® Processor N3350 
            </li>
            <li>
                Network Connections - Ethernet or Wi-Fi (2.4G Hz or 5G Hz)
            </li>
            <li>
                Bill Validator - SCN - 600 Notes
            </li>
            <li>
                Cameras - QR Scanner 
            </li>
            <li>
                Voltage - 100‐240VAC 
            </li>
          </ul>


          </div>

        </div>
        </div>
     </div>
             <Footer/>
             </>
   );
};

export default ProductDetails;