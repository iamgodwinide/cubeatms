"use client"

import React from 'react'
import useCart from '@/store/useCart'
import Link from 'next/link'

const Cart = () => {
  const { items, removeItem, updateQuantity, getTotal, isCartOpen, setCartOpen } = useCart()

  if (!isCartOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full md:w-[400px] bg-[#1F1F21] p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-white text-xl font-bold">Item added to your cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-white">
            <ion-icon name="close-outline" size="large"></ion-icon>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="text-center text-white py-10">
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-700 pb-4">
                  <div className="w-20 h-20 bg-gray-800 relative">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white text-sm font-medium">{item.name}</h3>
                    <p className="text-gray-400 text-sm">${item.price}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="text-white p-1"
                      >
                        <ion-icon name="remove-outline"></ion-icon>
                      </button>
                      <span className="text-white text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="text-white p-1"
                      >
                        <ion-icon name="add-outline"></ion-icon>
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-400 hover:text-white"
                  >
                    <ion-icon name="trash-outline"></ion-icon>
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between text-white">
                <span>Subtotal</span>
                <span>${getTotal().toFixed(2)}</span>
              </div>
              <Link onClick={() => setCartOpen(false)} href={"/cart"} className="w-full block px-3 text-center bg-[#e3fc02] text-black py-3 font-medium hover:opacity-90">
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Cart
