import React from 'react'
import Title from './Title'
import shipping from '../assets/shipping-fast.svg'
import hot from '../assets/hot-food.svg'
import fresh from '../assets/fresh-food.svg'
import hat from '../assets/hat-chef.svg'

function Features() {
  return (
    <section className='max-padd-container py-16 xl:py-28 !pb-12'>
      <Title
        title1={"WHY CHOOSE"}
        title2={"US"}
        titlestyles={"text-center !pb-5 !pt-5"}
        parastyle={"!block"}
      />

      {/* SINGLE GRID CONTAINER */}
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 gap-y-12'>

        {/* Box 1 */}
        <div className='flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl'>
          <img src={shipping} alt="shipping" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5'>Fast Delivery</h5>
            <hr className='w-8 bg-secondary h-1 rounded-full border-none' />
          </div>
          <p className='text-center'>
            Get your order quickly with our reliable and efficient services
          </p>
        </div>

        {/* Box 2 */}
        <div className='flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl'>
          <img src={hot} alt="hot food" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5'>Hot Foods</h5>
            <hr className='w-8 bg-secondary h-1 rounded-full border-none' />
          </div>
          <p className='text-center'>
            Savor freshly prepared, steaming hot meals delivered to you
          </p>
        </div>

        {/* Box 3 */}
        <div className='flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl'>
          <img src={fresh} alt="fresh food" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5'>Fresh Foods</h5>
            <hr className='w-8 bg-secondary h-1 rounded-full border-none' />
          </div>
          <p className='text-center'>
            We serve meals made from the freshest and finest ingredients daily
          </p>
        </div>

        {/* Box 4 */}
        <div className='flexCenter flex-col gap-3 bg-deep p-4 py-8 rounded-xl'>
          <img src={hat} alt="chef" height={44} width={44} />
          <div className='flexCenter flex-col'>
            <h5 className='h5'>Expert Chefs</h5>
            <hr className='w-8 bg-secondary h-1 rounded-full border-none' />
          </div>
          <p className='text-center'>
            Our skilled chefs craft every dish with passion and precision
          </p>
        </div>

      </div>
    </section>
  )
}

export default Features
