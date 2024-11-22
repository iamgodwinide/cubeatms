"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { countries as countriesData } from 'countries-list'
import useCart from '@/store/useCart'
import Cart from '../Cart/Cart'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const { getItemsCount, isCartOpen, setCartOpen } = useCart()

  // Convert countries data to array and sort alphabetically
  const countries = Object.entries(countriesData)
    .map(([code, country]) => ({
      name: country.name,
      currency: country.currency,
      code: code,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  useEffect(() => {
    setMounted(true)
    const detectCountry = async () => {
      try {
        const response = await axios.get('https://ipapi.co/json/')
        const countryCode = response.data.country_code
        const detectedCountry = countries.find(country => country.code === countryCode)
        
        if (detectedCountry) {
          setSelectedCountry(detectedCountry)
        } else {
          setSelectedCountry(countries.find(c => c.code === 'US'))
        }
      } catch (error) {
        console.error('Error detecting country:', error)
        setSelectedCountry(countries.find(c => c.code === 'US'))
      } finally {
        setLoading(false)
      }
    }

    detectCountry()

    // Add click event listener to handle clicks outside dropdown and mobile menu
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Prevent hydration issues by not rendering until mounted
  if (!mounted) {
    return null
  }

  return (
    <>
      <div className='container'>
        {/* desktop nav */}
        <div className='hidden md:flex justify-between items-center py-5'>
          <div className='flex gap-10 item-center'>
            <Image alt='cubeatms' src={"/logo.avif"} width={100} height={100} />
            <div className='flex items-center gap-5'>
              <Link href={"/"} className='underline text-white text-xs hover:underline'>Home</Link>
              <Link href={"/catalog"} className='text-white text-xs hover:underline'>Catalog</Link>
              <Link href={"/about"} className='text-white text-xs hover:underline'>About Us</Link>
              <Link href={"/contact"} className='text-white text-xs hover:underline'>Contact</Link>
            </div>
          </div>

          <div className='flex items-center gap-5 text-xs'>
            <div className="relative inline-block" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#1F1F21] text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : selectedCountry ? (
                  `${selectedCountry.name} | USD $`
                ) : (
                  'Select Country'
                )}
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 bg-[#2D2D30] rounded-md shadow-lg">
                  <div>
                    <input
                      type="text"
                      placeholder="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 bg-transparent text-white bg-[#1F1F21]"
                    />
                  </div>
                  <div className="max-h-96 overflow-y-auto bg-[#1F1F21]">
                    {filteredCountries.map((country) => (
                      <div
                        key={country.code}
                        className="px-4 py-2 cursor-pointer text-white hover:bg-[#2D2D30] transition-colors"
                        onClick={() => {
                          setSelectedCountry(country)
                          setIsOpen(false)
                          setSearchTerm('')
                        }}
                      >
                        {country.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <Link href={"#"} className='text-white text-sm'>
                <ion-icon name="search-outline"></ion-icon>
            </Link>
            <Link href={"#"} className='text-white text-sm'>
                <ion-icon name="person-outline"></ion-icon>
            </Link>
            <Link href={"/cart"} className='text-white text-sm relative'>
                <ion-icon name="bag-handle-outline"></ion-icon>
                {getItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#e3fc02] text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {getItemsCount()}
                  </span>
                )}
            </Link>
          </div>
        </div>

        {/* mobile nav */}
        <div className='flex justify-between items-center py-5 md:hidden'>
          <button 
            className='text-white text-xl'
            onClick={() => setMobileMenuOpen(true)}
          >
            <ion-icon name="menu-outline"></ion-icon>
          </button>

          <div className='flex gap-10 item-center'>
            <Image alt='cubeatms' src={"/logo.avif"} width={100} height={100} />
          </div>

          <div className='flex items-center gap-5 text-xs'>
            <Link href={"#"} className='text-white text-xl'>
                <ion-icon name="search-outline"></ion-icon>
            </Link>
            <Link href={"#"} className='hidden md:inline-block text-white text-xl'>
                <ion-icon name="person-outline"></ion-icon>
            </Link>
            <Link href={"/cart"} className='text-white text-xl relative'>
                <ion-icon name="bag-handle-outline"></ion-icon>
                {getItemsCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#e3fc02] text-black text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {getItemsCount()}
                  </span>
                )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 bg-white ${
          mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div 
          ref={mobileMenuRef}
          className={`fixed inset-y-0 left-0 w-64 bg-[#1F1F21] transform transition-transform duration-300 ease-in-out ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="p-5">
            <div className="flex justify-between items-center mb-8">
              <button 
                className="text-white text-xl"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ion-icon name="close-outline"></ion-icon>
              </button>
            </div>
            
            <div className="flex flex-col gap-4">
              <Link 
                href="/" 
                className="text-white text-sm py-2 hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/catalog" 
                className="text-white text-sm py-2 hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Catalog
              </Link>
              <Link 
                href="/about" 
                className="text-white text-sm py-2 hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                href="/contact" 
                className="text-white text-sm py-2 hover:text-gray-300 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            <div className="mt-8">
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-full bg-[#2D2D30] text-white px-4 py-2 rounded-md flex items-center justify-between"
                >
                  <span>
                    {loading ? (
                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    ) : selectedCountry ? (
                      `${selectedCountry.name} | USD $`
                    ) : (
                      'Select Country'
                    )}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="absolute left-0 right-0  mt-2 bg-[#2D2D30] rounded-md shadow-lg">
                    <div>
                      <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-3 py-2 bg-transparent text-white bg-[#1F1F21]"
                      />
                    </div>
                    <div className="max-h-60 overflow-y-auto bg-[#1F1F21]">
                      {filteredCountries.map((country) => (
                        <div
                          key={country.code}
                          className="px-4 py-2 cursor-pointer text-white hover:bg-[#2D2D30] transition-colors"
                          onClick={() => {
                            setSelectedCountry(country)
                            setIsOpen(false)
                            setSearchTerm('')
                          }}
                        >
                          {country.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cart */}
      <Cart isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}

export default Navbar