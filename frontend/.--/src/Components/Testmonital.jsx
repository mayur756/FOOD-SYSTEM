import React from 'react'
import Title from './Title'
import { FaCheck, FaStar } from 'react-icons/fa6'
import user1 from '../assets/testimonials/user1.png'
import user2 from '../assets/testimonials/user2.png'
import food1 from '../assets/food_1.png'
import food2 from '../assets/food_2.png'
import food3 from '../assets/food_12.png'
import food4 from '../assets/food_44.png'
function Testmonital() {
    return (
        <div>
            <div className='py-16'>
                <Title title1={"DELICIOUS"} title2={"REVIWES"} titlestyles={"text-center !pb-12 pt-10"} parastyle={"!block"} />
            </div>
            <div className='max-padd-container'>
                {/* container */}
                <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-20 mb-16 rounded-xl'>
                    {/* left side */}
                    <div className='hidden sm:flex items-center justify-between flex-col gap-10'>
                        <Title title1={"What People"} title2={'Says'} title1styles={"pb-10"} parastyle={'!block'} />
                        <div className='flex flex-col gap-1 bg-deep p-2 rounded'>
                            <div className='flex text-secondary gap-2'><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></div>
                            <div className='medium-14'>more than<b>+25,000 Reviews</b></div>
                        </div>
                    </div>
                    {/* right side */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-7'>
                        {/* review card */}
                        <div className='flex flex-col gap-1 rounded-lg p-4 bg-deep'>
                            <div className='flexBetween'>
                                <div className='flex items-center gap-2 '>
                                    <img src={user1} alt='' height={44} width={44} className='rounded-full'></img>
                                    <h5 className='bold-14'>John Doe</h5>
                                </div>
                                <div className='bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2  text-xs font-semibold'>
                                    <FaCheck />Verfied
                                </div>
                            </div>
                                <hr className='h-[1px] w-full my-2' />
                                <div className='flex gap-x-1 text-secondary mt-5 mb-1 text-xs '>
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <h4 className='h4'>High Quality</h4>
                                <p>The food was absolutely delicious! Every bite was bursting with flavor, and the quality was top-notch. The service was quick, and everything arrived fresh. Highly recommend trying it out!</p>
                                <div className='flex mt-5'>
                                    <img src={food1} height={44} width={44} className='rounded aspect-square object-cover'/>
                                    <img src={food2} height={44} width={44} className='rounded aspect-square object-cover'/>
                                </div>
                        </div>
                        <div className='flex flex-col gap-1 rounded-lg p-4 bg-deep'>
                            <div className='flexBetween'>
                                <div className='flex items-center gap-2 '>
                                    <img src={user2} alt='' height={44} width={44} className='rounded-full'></img>
                                    <h5 className='bold-14'>Iza</h5>
                                </div>
                                <div className='bg-secondary text-white rounded-full flexCenter gap-x-2 p-1 px-2  text-xs font-semibold'>
                                    <FaCheck />Verfied
                                </div>
                            </div>
                                <hr className='h-[1px] w-full my-2' />
                                <div className='flex gap-x-1 text-secondary mt-5 mb-1 text-xs '>
                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                </div>
                                <h4 className='h4'>Modern Design</h4>
                                <p>The food was absolutely delicious! Every bite was bursting with flavor, and the quality was top-notch. The service was quick, and everything arrived fresh. Highly recommend trying it out!</p>
                                <div className='flex mt-5'>
                                    <img src={food3} height={44} width={44} className='rounded aspect-square object-cover'/>
                                    <img src={food4} height={44} width={44} className='rounded aspect-square object-cover'/>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testmonital
