"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import './styles.css'
import useCart from '@/store/useCart'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Checkout = () => { 
  const router = useRouter()
  const { items } = useCart()
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    apartment: '',
    city: '',
    country: '',
    state: '',
    zipCode: '',
    phone: '',
    // Billing Address
    sameAsShipping: true,
    billingAddress: '',
    billingApartment: '',
    billingCity: '',
    billingCountry: '',
    billingState: '',
    billingZipCode: '',
  })

  const [selectedPayment, setSelectedPayment] = useState('')
  const [activeAccordion, setActiveAccordion] = useState('')

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
    "Germany",
    "France",
    "Spain",
    "Italy",
    "Netherlands",
    "Belgium",
    "Switzerland",
    "Austria",
    "Sweden",
    "Norway",
    "Denmark",
    "Finland",
    "Ireland",
    "New Zealand",
    "Japan",
    "South Korea",
    "Singapore",
    "Hong Kong",
    "United Arab Emirates",
    "Saudi Arabia",
    "Brazil",
    "Mexico",
    "Argentina",
    "Chile",
    "South Africa",
    "Israel",
    "Poland",
    "Czech Republic",
    "Hungary",
    "Greece",
    "Portugal",
    "Romania",
    "Bulgaria",
    "Croatia",
    "Slovakia",
    "Slovenia"
  ].sort()

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const shipping = 300
  const subtotal = calculateSubtotal()
  const total = subtotal + shipping

  const handleSubmit = (e) => {
    e.preventDefault()

    // Create base64 encoded data to avoid URL length limitations
    const orderData = btoa(JSON.stringify({
      customer: {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        phone: formData.phone,
      },
      shipping: {
        address: formData.address,
        apartment: formData.apartment,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      billing: formData.sameAsShipping ? null : {
        address: formData.billingAddress,
        apartment: formData.billingApartment,
        city: formData.billingCity,
        state: formData.billingState,
        zipCode: formData.billingZipCode,
        country: formData.billingCountry,
      },
      payment: {
        method: selectedPayment,
        address: selectedPayment === 'bitcoin' 
          ? 'bc1q66sjj4v54jhlmv3qyhlfngj2yuejujtweylp0z'
          : 'TW3YbuGbwFrPKniqm1wBzGxSBjXiJorgn2'
      },
      order: {
        subtotal,
        shipping,
        total,
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image
        }))
      }
    }))

    router.push('/checkoutcomplete?data=' + orderData)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-4 border-b">
        <div className="container flex justify-between items-center">
          <Link href="/" className='text-black text-xl md:text-2xl font-bold'>
            Cube ATMs
          </Link>
          <Link href={"/cart"} className='text-blue-600 text-2xl'>
            <ion-icon name="bag-handle-outline"></ion-icon>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          <div className="flex-1">
            {/* Contact Information Section */}
            <div className="checkout-section mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="checkout-title">Contact</h2>
                  <Link href="#" className="text-blue-600 hover:text-blue-700">
                    Log in
                  </Link>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="checkout-label">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="checkout-input"
                      placeholder="Enter your email"
                      required
                    />
                  </div>

                  {/* Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="checkout-label">
                        First name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="checkout-label">
                        Last name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="company" className="checkout-label">
                      Company (optional)
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="checkout-input"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label htmlFor="address" className="checkout-label">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="checkout-input"
                      placeholder="Street address"
                      required
                    />
                  </div>

                  {/* Apartment */}
                  <div>
                    <label htmlFor="apartment" className="checkout-label">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      className="checkout-input"
                    />
                  </div>

                  {/* City, Country, State, ZIP */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="city" className="checkout-label">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="country" className="checkout-label">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      >
                        <option value="">Select a country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="state" className="checkout-label">
                        State
                      </label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="zipCode" className="checkout-label">
                        ZIP code
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="checkout-label">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="checkout-input"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Shipping Method Section */}
            <div className="checkout-section mb-6">
              <h2 className="checkout-title">Shipping method</h2>
              <div className="shipping-option selected">
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    id="ups"
                    name="shipping"
                    checked
                    className="text-blue-600"
                    readOnly
                  />
                  <div>
                    <label htmlFor="ups" className="font-medium">UPS Ground</label>
                    {/* <p className="text-sm text-gray-500">5-7 business days</p> */}
                  </div>
                </div>
                <span className="font-medium">$300.00</span>
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="checkout-section mb-6">
              <h2 className="checkout-title">Payment method</h2>
              
              {/* Bitcoin Payment Option */}
              <div className="payment-accordion">
                <div 
                  className="payment-header"
                  onClick={() => setActiveAccordion(activeAccordion === 'bitcoin' ? '' : 'bitcoin')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === 'bitcoin'}
                      onChange={() => setSelectedPayment('bitcoin')}
                    />
                    <span className="font-medium">Pay with Bitcoin</span>
                  </div>
                  <ion-icon 
                    name={activeAccordion === 'bitcoin' ? 'chevron-up' : 'chevron-down'}
                  ></ion-icon>
                </div>
                {activeAccordion === 'bitcoin' && (
                  <div className="payment-content">
                    <p className="text-sm text-gray-600 mb-4">
                      Send the exact amount of BTC to the following address:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                      <code className="text-sm">bc1q66sjj4v54jhlmv3qyhlfngj2yuejujtweylp0z</code>
                    </div>
                  </div>
                )}
              </div>

              {/* USDT Payment Option */}
              <div className="payment-accordion">
                <div 
                  className="payment-header"
                  onClick={() => setActiveAccordion(activeAccordion === 'usdt' ? '' : 'usdt')}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="payment"
                      checked={selectedPayment === 'usdt'}
                      onChange={() => setSelectedPayment('usdt')}
                    />
                    <span className="font-medium">Pay with USDT</span>
                  </div>
                  <ion-icon 
                    name={activeAccordion === 'usdt' ? 'chevron-up' : 'chevron-down'}
                  ></ion-icon>
                </div>
                {activeAccordion === 'usdt' && (
                  <div className="payment-content">
                    <p className="text-sm text-gray-600 mb-4">
                      Send USDT (ERC20) to the following address:
                    </p>
                    <div className="bg-gray-100 p-4 rounded-lg mb-4">
                      <code className="text-sm">TW3YbuGbwFrPKniqm1wBzGxSBjXiJorgn2</code>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Billing Address Section */}
            <div className="checkout-section mb-6">
              <h2 className="checkout-title">Billing address</h2>
              
              <div className="mb-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="sameAsShipping"
                    checked={formData.sameAsShipping}
                    onChange={handleChange}
                    className="text-blue-600"
                  />
                  <span className="text-sm">Same as shipping address</span>
                </label>
              </div>

              {!formData.sameAsShipping && (
                <div className="space-y-6">
                  <div>
                    <label htmlFor="billingAddress" className="checkout-label">
                      Address
                    </label>
                    <input
                      type="text"
                      id="billingAddress"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleChange}
                      className="checkout-input"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="billingApartment" className="checkout-label">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="billingApartment"
                      name="billingApartment"
                      value={formData.billingApartment}
                      onChange={handleChange}
                      className="checkout-input"
                    />
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="billingCity" className="checkout-label">
                        City
                      </label>
                      <input
                        type="text"
                        id="billingCity"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      />
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="billingCountry" className="checkout-label">
                        Country
                      </label>
                      <select
                        id="billingCountry"
                        name="billingCountry"
                        value={formData.billingCountry}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      >
                        <option value="">Select a country</option>
                        {countries.map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="billingState" className="checkout-label">
                        State
                      </label>
                      <input
                        type="text"
                        id="billingState"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="billingZipCode" className="checkout-label">
                        ZIP code
                      </label>
                      <input
                        type="text"
                        id="billingZipCode"
                        name="billingZipCode"
                        value={formData.billingZipCode}
                        onChange={handleChange}
                        className="checkout-input"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                type="submit"
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Complete order
              </button>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-[380px]">
            <div className="checkout-section sticky top-4">
              <h2 className="checkout-title">Order summary</h2>
              
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="font-medium">${item.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>${shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                <ion-icon name="lock-closed"></ion-icon>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout