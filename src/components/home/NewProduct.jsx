import React, { useEffect, useState } from 'react'
import { listProductBy } from '../../api/product'
import ProductCard from '../card/ProductCard'
import SwiperShowProduct from '../../utils/SwiperShowProduct'
import { SwiperSlide } from 'swiper/react'
import { NavLink } from 'react-router-dom'

const NewProduct = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    loadData()
  }, [])

  const loadData = () => {
    listProductBy('updatedAt', 'desc', 12)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        สินค้าใหม่
      </h2>
      <SwiperShowProduct>
        {data?.map((item) => (
          <SwiperSlide key={item.id} className="flex justify-center">
            <ProductCard item={item} />
          </SwiperSlide>
        ))}
      </SwiperShowProduct>
      <NavLink to ="/shop">
      
      <div className="text-center mt-8">
        <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-500 transition duration-300 ease-in-out">
          ดูสินค้าทั้งหมด
        </button>
      </div>
      </NavLink> 
    </div>
  )
}

export default NewProduct