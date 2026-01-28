import React, { useContext, useEffect, useState } from 'react'
import { shopcontext } from '../context/Shopcontext'
import Title from './Title'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import Item from './Item'

function PopularFood() {
  const { foods } = useContext(shopcontext)
  const [popularFoods, setPopularFoods] = useState([])

  useEffect(() => {
    if (Array.isArray(foods)) {
      const data = foods.filter(item => item.popular === true)
      setPopularFoods(data.slice(0, 6))
    }
  }, [foods])

  return (
    <section className="max-padd-container pt-16">
      <Title
        title1={"Popular"}
        title2={"Foods"}
        titlestyles={"text-center !pb-16"}
        parastyle={"!block"}
      />

      {/* SWIPER */}
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          700: {
            slidesPerView: 2,
            spaceBetween: 25,
          },
          1050: {
            slidesPerView: 3,
            spaceBetween: 25,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 25,
          },
        }}
        modules={[Autoplay, Pagination]}
        className="h-[255px]"
      >
        {popularFoods.map(food => (
          <SwiperSlide key={food._id} className="pl-16">
            <Item food={food} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

export default PopularFood
