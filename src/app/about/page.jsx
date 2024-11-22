import Subscribe from '@/components/Subscribe/Subscribe'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Announcement from "@/components/Annoucement/Announcement";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";

const About = () => {
  return (
    <>
    <Announcement/>
    <Navbar/>
    <div>
        <Image src={"/about.jpg"} width={3000} height={3000} className='w-full' />
        <div className='container'>
            <h1 className='text-white font-bold text-center text-2xl md:text-6xl mt-10'>Cube ATMs</h1>
            <p className='text-white text-base text-center mt-5'>
            Cube ATMs was founded with a clear mission: to bring Bitcoin—the world’s hardest money and the future global reserve currency—to unbanked populations in developing nations. Built by the Bitcoin Capitalist, who pioneered the first Bitcoin ATMs in Central and South America, Cube ATMs leverage years of industry experience to offer a new standard in Bitcoin accessibility.
            </p>
            <p className='text-white text-base text-center mt-5'>
            The Cube ATM solves two major challenges in the current market. First, many existing ATMs are locked into centralized software systems that impose lifetime royalties on all transactions. If disputes arise or payments are missed, these companies can cut off access to the software, rendering the machines useless. This not only puts your business at risk but also exposes sensitive data to potential security breaches. After experiencing these issues firsthand with one of the largest ATM manufacturers, the Bitcoin Capitalist was inspired to develop Cube ATMs—an affordable and decentralized alternative.
            </p>
            <p className='text-white text-base text-center mt-5'>
            Second, Cube ATMs address the issue of affordability. While some ATMs may seem inexpensive at first, many come with hidden costs like ongoing royalties and monthly fees. Alternatives that don’t charge royalties often come with significantly inflated upfront costs. Cube ATMs break this mold by offering an open-source software solution that is both royalty-free and secure. It cannot be shut down by us or anyone else. Designed by a Bitcoiner for Bitcoiners, Cube ATMs provide a cost-effective, decentralized option that empowers users and promotes Bitcoin adoption worldwide.   
            </p>


            <div className='flex flex-col md:flex-row gap-10 md:gap-20 mt-20'>
                <Image src="/about2.jpg" width={3000} height={3000} className='w-full md:w-2/4' />
                <div>
                    <h2 className='text-white text-2xl text-center md:text-start md:text-5xl font-bold'>Bitcoin Capitalist</h2>
                    <p className='text-white text-base text-center md:text-start mt-5'>
                        Serial Bitcoin entrepreneur with a track record of pioneering the first Bitcoin ATMs across Central and South America. Currently manufacturing Cube ATMs, the world’s most affordable commercial ATMs, aimed at making Bitcoin accessible in developing markets globally. Operates Bitcoin mining operations spanning from South America to the Middle East. A recognized leader in the Bitcoin space, both as an educator and a top influencer on social media.
                    </p>
                    <Link href={"https://www.linkedin.com/in/bitcoin-capitalist/"} 
                        className='text-sm text-[#e3fc02] border border-[#e3fc02] w-full px-4 py-2 h-10 mt-5 hover:border-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                    >
                        Linkedin
                    </Link>
                </div>
            </div>
        </div>
        <Subscribe/>
    </div>
    <Footer/>
    </>
  )
}

export default <ABout></ABout>