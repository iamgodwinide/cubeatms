"use client"

import Link from 'next/link'
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { countries as countriesData } from 'countries-list'

const Footer = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [loading, setLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const dropdownRef = useRef(null)

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

    // Add click event listener to handle clicks outside dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
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
    <footer className="bg-[#1F1F21] text-white">
    {/* social links */}
      <div className='container'>
        <div className='flex justify-center items-center p-2'>
          <div className='flex gap-4 items-center justify-center text-lg text-white my-20'>
            <Link href="https://www.facebook.com/profile.php?id=100090132821837">
              <ion-icon name="logo-facebook"></ion-icon>
            </Link>
            <Link href="https://www.instagram.com/cubeatms/">
              <ion-icon name="logo-instagram"></ion-icon>
            </Link>
            <Link href="https://youtube.com/playlist?list=PLEh1TuNoHd_iSrFFLmjxrC3Q8l1ULmeeF&si=mwQHFT6PRF-4-eM_">
              <ion-icon name="logo-youtube"></ion-icon>
            </Link>
            <Link href="https://x.com/BTCCapitalist21">
              <ion-icon name="logo-pinterest"></ion-icon>
            </Link>
            <Link href="https://www.snapchat.com/add/btccapitalist?sender_web_id=6df09959-9df4-45e9-b816-16e6df08ce29&device_type=desktop&is_copy_url=true">
              <ion-icon name="logo-snapchat"></ion-icon>
            </Link>
          </div>
        </div>  
      </div>
      <div className='py-10 border-t border-gray-600'></div>
      <div className="container ">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Country Selector */}
          <div>
            <h3 className="mb-4 text-white text-xs">Country/region</h3>
            <div className="relative inline-block border border-white" ref={dropdownRef}>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#1F1F21] text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm w-full"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : selectedCountry ? (
                  `${selectedCountry.name} | USD $`
                ) : (
                  'Select Country'
                )}
                <svg
                  className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''} ml-auto`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isOpen && (
                <div className="absolute bottom-full left-0 z-10 mb-2 w-full bg-[#2D2D30] rounded-md shadow-lg">
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
                        className="px-4 py-2 cursor-pointer text-white hover:bg-[#2D2D30] transition-colors text-sm"
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

        {/* Copyright */}
        <div className="mt-5 pt-8 text-xs mb-10">
          <p>&copy; {new Date().getFullYear()}, Cube ATMs Powered by <Link href="https://shopify.com" className='hover:underline'>Shopify</Link>. <Link href="/privacy-policy" className='hover:underline'>Privacy Policy</Link></p>
        </div>
      </div>
    </footer>
  )
}

export default Footer