'use client'
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const Page = ({ params }) => {

  const [data, setData] = useState(null);


  const fetchBlogData = async() => {
    const response = await axios.get('/api/blog',{
      params: {
       id:params.id
     }
   })
    setData(response.data);
  }

  useEffect(() => {
    fetchBlogData();
  },)

  return ( data?<>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href='/'>
          <Image src={assets.logo} width={180} alt='' className='w-[130px] sm:w-auto' />
          </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border-black shadow-[-7px_7px_0px_#000000] '>Get started <Image src={assets.arrow} alt=''/></button>
      </div>

      <div className="text-center my-24">
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
        <Image className='mx-auto mt-6 border border-white rounded-full ' src={data.authorImg} width={60} height={60} alt='' />
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{ data.author}</p>
      </div>
    </div>
    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
      <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt=''/>
      <h1 className='my-8 text-[26px] font-semibold'>Introduction</h1>


      <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}></div>


      <h3 className='my-5 text-[18px] font-semibold'>God of Space rejuvenated my body to a certain degree after he sent me here and I was close to 35 years old as the Hero of Space, but the Cancer from the original body remained.</h3>
      <p className='my-3'>You seem rather reluctant in the face of a genuine Luminant. I thought you wpould believe in this by now and be more…inviting of my requests</p>
      <p className='my-3'>She had watched the entire battle between the Ode and Skullius</p>
      <p className='my-3'>In all honesty, since not that much was known about the Luminants old lives before Aigas – as they never spoke much about it</p>

      <div className='my-24'>
        <p className='text-black font font-semibold my-4'>Share this article on Social media</p>
        <div className='flex'>
        <Image src={assets.facebook_icon} alt='' width={40} />
        <Image src={assets.twitter_icon} alt='' width={40} />
        <Image src={assets.googleplus_icon} alt='' width={40} />
      </div>
      </div>


    </div>
    <Footer/>
    </>:<></>
  )
}

export default Page
