import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-[#fdfbf6] mt-20">
      
      {/* TOP TEXT */}
      <div className="text-center px-6 pt-12">
        <h3 className="h3 mb-2">
          Discover Flavours that awaken your taste buds.
        </h3>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Experience a variety of dishes made with the freshest ingredients and bold,
          authentic flavors. Enjoy a delicious journey.
        </p>
        <hr className="my-10 h-[2px] bg-gray-300/60" />
      </div>

      {/* MAIN FOOTER */}
      <div className="max-padd-container grid grid-cols-1 md:grid-cols-4 gap-10 pb-14">

        {/* LOGO + SUBSCRIBE */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center bold-24">
            <span className="flex items-center justify-center h-8 w-8 bg-secondary text-white rounded-full mr-1">
              F
            </span>
            oodessa
          </Link>

          <p className="text-sm text-gray-600">
            Looking for something delicious? Explore a variety of mouthwatering meals,
            crafted to satisfy your cravings and bring joy to every occasion.
          </p>

          <div className="flex mt-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-full outline-none border text-sm w-full"
            />
            <button className="bg-secondary text-white px-6 rounded-r-full text-sm font-semibold">
              Subscribe
            </button>
          </div>
        </div>

        {/* LEARN MORE */}
        <div>
          <h5 className="bold-16 mb-4">Learn More</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>About Us</li>
            <li>Fresh Foods</li>
            <li>Fast Foods</li>
            <li>Hot Deals</li>
            <li>Popular Foods</li>
            <li>FAQ</li>
          </ul>
        </div>

        {/* OUR COMMUNITY */}
        <div>
          <h5 className="bold-16 mb-4">Our Community</h5>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Terms & Conditions</li>
            <li>Special Offers</li>
            <li>Customer Reviews</li>
          </ul>
        </div>

        {/* CONTACT + SOCIAL */}
        <div>
          <h5 className="bold-16 mb-4">Contact Us</h5>
          <ul className="space-y-2 text-sm text-gray-600 mb-4">
            <li>Contact Number: 123-456-7890</li>
            <li>Email Address: info@foodessa.com</li>
          </ul>

          <h5 className="bold-16 mb-3">Social</h5>
          <div className="flex gap-3 text-secondary">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedinIn />
          </div>
        </div>

      </div>

      {/* BOTTOM BAR */}
      <div className="bg-secondary text-white text-sm py-3 px-6 flex justify-between">
        <span>2025 Foodessa</span>
        <span>All rights reserved</span>
      </div>

    </footer>
  )
}

export default Footer
