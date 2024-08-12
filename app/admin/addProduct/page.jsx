'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const Page = () => {

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennet",
    authorImg: "/author_img.png",
    image: null
  });

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData(prevData => ({ ...prevData, [name]: value }));
    console.log(data);
  }

  const onImageChangeHandler = (e) => {
    const file = e.target.files[0];
    setData(prevData => ({ ...prevData, image: file }));
  }

  const OnSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('category', data.category);
    formData.append('author', data.author);
    formData.append('authorImg', data.authorImg);
    formData.append('image', data.image);

    try {
      const response = await axios.post('/api/blog', formData);
      if (response.data.success) {
        toast.success(response.data.msg);

        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennet",
          authorImg: "/author_img.png",
          image: null
        });
      } else {
        toast.error("Error");
      }
    } catch (error) {
      toast.error("An error occurred while submitting the form.");
    }
  }

  return (
    <>
      <form onSubmit={OnSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>upload thumbnail</p>
        <label htmlFor="image">
          <Image
            src={!data.image ? assets.upload_area : URL.createObjectURL(data.image)}
            width={140}
            height={70}
            alt=''
            className='mt-4'
          />
        </label>
        <input onChange={onImageChangeHandler} type="file" id="image" hidden required />
        <p className='text-xl mt-4 '>Blog title</p>
        <input
          name='title'
          onChange={onChangeHandler}
          value={data.title}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          type="text"
          placeholder='Type Here'
          required
        />
        <p className='text-xl mt-4 '>Blog Description</p>
        <textarea
          name='description'
          onChange={onChangeHandler}
          value={data.description}
          className='w-full sm:w-[500px] mt-4 px-4 py-3 border'
          type="text"
          placeholder='write content here'
          rows={6}
          required
        />
        <p className='text-xl mt-4 '>Blog category</p>
        <select
          name="category"
          onChange={onChangeHandler}
          value={data.category}
          className='w-40 mt-4 px-4 py-3 border text-gray-500'
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br/>
        <button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
      </form>
    </>
  )
}

export default Page
