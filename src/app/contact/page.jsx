import Contact from '@/components/Contact/Contact'
import Link from 'next/link'
import React from 'react'
import Announcement from "@/components/Annoucement/Announcement";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";


const contact = () => {
  return (
    <>
         <Announcement/>
         <Navbar/>
    <div className='container'>
        <p className='text-center text-white text-lg mb-5 mt-10'>
            For more information on setting ATMs up and software demos, subscribe to our Cube ATMs <Link href={"https://cubeatms.substack.com/"} className='text-[#e3fc02]'>Substack</Link> newsletter.
        </p>
        <p className='text-center text-white text-lg mb-5'>
            Lets Connect: <Link href={"https://www.youtube.com/@bitcoincapitalist"} className='text-[#e3fc02]'>YouTube</Link>, <Link href={"https://www.instagram.com/bitcoin.capitalist/"} className='text-[#e3fc02]'>Instagram</Link>, <Link href={"https://www.linkedin.com/in/bitcoin-capitalist/"} className='text-[#e3fc02]'>Linkedin</Link>, <Link href={"https://t.me/BitcoinCapitalist"} className='text-[#e3fc02]'>Telegram</Link>, <Link href={"https://x.com/BTCCapitalist21"} className='text-[#e3fc02]'>Twitter</Link>, <Link href={"https://www.tiktok.com/@bitcoincapitalist?_t=8l2nf7PfnoZ&_r=1"} className='text-[#e3fc02]'>Tiktok</Link>, <Link href={"https://www.facebook.com/profile.php?id=100090132821837"} className='text-[#e3fc02]'>Facebook</Link>, <Link href={"https://www.snapchat.com/add/btccapitalist?invite_id=W2ccYF1M&locale=en_US&share_id=XNc62_hZRhWsYJC91BTyJg&xp_id=1&sid=0f8aadf84c2e4a4994e790a7ae1dbd2b"} className='text-[#e3fc02]'>Snap Chat</Link>,  <Link href={"https://www.bitcoincapitalistletter.com/"} className='text-[#e3fc02]'>Newsletter</Link>
        </p>
        <p className='text-center text-white text-lg mb-5'>
            Email: Travis@BitcoinCapitalist.io
        </p>

        <Contact/>
        <Footer/>
    </div>
    </>

  )
}

export default contact