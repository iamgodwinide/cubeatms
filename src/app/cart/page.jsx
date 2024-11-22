"use client"
import useCart from '@/store/useCart'
import Image from 'next/image'
import Link from 'next/link'
import products from '@/constants/products'
import Announcement from "@/components/Annoucement/Announcement";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";


export default function Cart() {
  const { items, updateQuantity, getTotal, removeItem } = useCart()

  const cartItems = items.map(item => {
    const product = products.find(p => p.id === item.id)
    return {
      ...product,
      quantity: item.quantity,
      total: product.price * item.quantity
    }
  })

  const cartTotal = items.reduce((sum, item) => sum + item.total, 0)

  return (
    <>
    <Announcement/>
    <Navbar/>
    <div className='container'>

        <div className='flex justify-between items-center mb-6 mt-10'>
            <h1 className='text-white text-2xl font-bold md:text-5xl'>Your Cart</h1>
            <Link href={"/catalog"} className='text-[#e3fc02] text-base underline'>Continue shopping</Link>
        </div>
      
      {cartItems.length === 0 ? (
        <div className='text-center py-20'>
          <h2 className='text-white text-2xl font-medium mb-5'>Your cart is empty</h2>
          <Link href='/catalog' className='text-[#e3fc02] hover:underline'>
            Let&apos;s find something for you
          </Link>
        </div>
      ) : (
        <>
          <div className='mt-10'>
            {/* Header */}
            <div className='grid grid-cols-12 gap-4 text-white text-sm border-b border-gray-700 pb-4'>
              <div className='col-span-6'>Product</div>
              <div className='hidden md:block col-span-6 md:col-span-3 text-center'>Quantity</div>
              <div className='col-span-6 md:col-span-3 text-right'>Total</div>
            </div>

            {/* Cart Items */}
            <div className='space-y-4 mt-4 text-xs md:text-base'>
              {cartItems.map((item) => (
                <div key={item.id} className='grid grid-cols-12 gap-4 text-white items-center py-4 border-b border-gray-700'>
                  {/* Product */}
                  <div className='col-span-6 flex gap-4 items-center'>
                    <Image src={item.image} alt={item.name} width={80} height={80} className='w-20 h-20 object-cover' />
                    <div>
                      <h3 className='font-medium'>{item.name}</h3>
                      <p className='text-sm text-gray-400'>${item?.price?.toLocaleString()}.00</p>
                      <div className='flex md:hidden justify-center gap-2 col-span-3'>
                        <div className='flex items-center justify-center gap-4 border border-white px-2 py-1 w-24 my-2'>
                        <button 
                            className='text-white'
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                            -
                        </button>
                        <span className='text-white'>{item.quantity}</span>
                        <button 
                            className='text-white'
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                            +
                        </button>
                        </div>
                        <button 
                            onClick={() => removeItem(item.id)}
                            className='text-[#e3fc02]  mt-2 text-xl'
                        >
                            <ion-icon name="trash-outline"></ion-icon>
                        </button>
                    </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <div className='hidden md:flex justify-center gap-5 col-span-3'>
                    <div className='flex items-center justify-center gap-4 border border-white px-2 py-1 w-32'>
                      <button 
                        className='text-white'
                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className='text-white'>{item.quantity}</span>
                      <button 
                        className='text-white'
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                        onClick={() => removeItem(item.id)}
                        className='text-[#e3fc02]  mt-2 text-xl'
                      >
                        <ion-icon name="trash-outline"></ion-icon>
                      </button>
                  </div>

                  {/* Total */}
                  <div className='col-span-6 md:col-span-3 text-right'>
                    ${item.total.toLocaleString()}.00
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className='mt-8 flex justify-end'>
              <div className='w-full md:w-96'>
                <div className='flex justify-end gap-10 text-white mb-4'>
                  <span className='text-xl md:text-2xl'>Estimated total</span>
                  <span className='text-xl md:text-2xl'>${getTotal().toLocaleString()}.00</span>
                </div>
                <p className='text-white my-2 mb-4'>Taxes, discounts and shipping calculated at checkout.</p>
                <Link href="/checkout" className='w-full block text-center font-bold bg-[#e3fc02] text-black py-3 px-6 hover:bg-[#c4d902] transition'>
                  Check out
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
    <Footer/>
    </>
  )
}