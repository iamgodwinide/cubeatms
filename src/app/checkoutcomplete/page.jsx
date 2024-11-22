"use client"
import Link from 'next/link'
import React, { useEffect, useState, Suspense } from 'react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import useCart from '@/store/useCart'

const OrderDetails = () => {
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState(null)
  const orderNumber = Math.floor(100000 + Math.random() * 900000)
  const { items } = useCart()

  useEffect(() => {
    try {
      const data = searchParams.get('data')
      if (data) {
        const decodedData = JSON.parse(atob(data))
        setOrderData(decodedData)
      }
    } catch (error) {
      console.error('Error parsing order data:', error)
    }
  }, [searchParams])

  if (!orderData) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading order details...</div>
  }

  const { customer, shipping, billing, payment, order } = orderData

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const shippingCost = 300
  const subtotal = calculateSubtotal()
  const total = subtotal + shippingCost

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="py-4 border-b">
        <div className="container flex justify-between items-center">
          <Link href="/" className='text-black text-xl md:text-2xl font-bold'>
            Cube ATMs
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        <div className="flex flex-col-reverse lg:flex-row gap-8">
          {/* Left Column - Order Confirmation */}
          <div className="flex-1">
            <div className="checkout-section mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <ion-icon name="checkmark-outline" className="text-2xl text-green-600"></ion-icon>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Thank you for your order!</h1>
                  <p className="text-gray-600">Order #{orderNumber}</p>
                </div>
              </div>

              {/* Order Status */}
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  We will email you an order confirmation with details and tracking info.
                </p>
              </div>

              {/* Customer Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="font-medium mb-3">Shipping Information</h2>
                  <div className="text-sm text-gray-600">
                    <p>{customer.firstName} {customer.lastName}</p>
                    <p>{shipping.address}</p>
                    {shipping.apartment && <p>{shipping.apartment}</p>}
                    <p>{shipping.city}, {shipping.state} {shipping.zipCode}</p>
                    <p>{shipping.country}</p>
                  </div>
                </div>

                <div>
                  <h2 className="font-medium mb-3">Contact Information</h2>
                  <div className="text-sm text-gray-600">
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phone}</p>
                    {customer.company && <p>Company: {customer.company}</p>}
                  </div>
                </div>

                <div>
                  <h2 className="font-medium mb-3">Payment Method</h2>
                  <div className="text-sm text-gray-600">
                    <p>{payment.method === 'bitcoin' ? 'Bitcoin' : 'USDT'}</p>
                    <p className="font-mono">{payment.address}</p>
                  </div>
                </div>

                {billing && (
                  <div>
                    <h2 className="font-medium mb-3">Billing Address</h2>
                    <div className="text-sm text-gray-600">
                      <p>{customer.firstName} {customer.lastName}</p>
                      <p>{billing.address}</p>
                      {billing.apartment && <p>{billing.apartment}</p>}
                      <p>{billing.city}, {billing.state} {billing.zipCode}</p>
                      <p>{billing.country}</p>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="font-medium mb-3">Shipping Method</h2>
                  <div className="text-sm text-gray-600">
                    <p>UPS Ground</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Shopping Button */}
            <div className="flex justify-center">
              <Link 
                href="/"
                className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
              >
                <ion-icon name="arrow-back-outline"></ion-icon>
                <span>Continue Shopping</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Cart Summary */}
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
                  <span>${shippingCost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${total.toLocaleString()}</span>
                </div>
              </div>

              {/* Print Receipt Button */}
              <button
                onClick={() => window.print()}
                className="w-full mt-6 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800"
              >
                <ion-icon name="print-outline"></ion-icon>
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CheckoutComplete = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading order details...</p>
        </div>
      </div>
    }>
      <OrderDetails />
    </Suspense>
  )
}

export default CheckoutComplete