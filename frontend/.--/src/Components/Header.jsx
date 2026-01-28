import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { RiShoppingBasketLine, RiUserLine } from 'react-icons/ri';
import { TbUserCircle, TbArrowNarrowRight } from 'react-icons/tb';
import { CgMenuLeft } from "react-icons/cg";
import { shopcontext } from '../context/Shopcontext';

export default function Header() {
  const { getCartCount, navigate, token, setToken ,clearCart} = useContext(shopcontext);
  const [menuOpened, setMenuOpened] = useState(false);

  const toggleMenu = () => {
    setMenuOpened((prev) => !prev);
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login'); 
  };

  const logout = async () => {
  await clearCart();   
  localStorage.removeItem("token");
  setToken("");
  navigate("/login");
};
  return (
    <header className='py-3 w-full sticky top-0 left-0 right-0 z-50 bg-white'>
      <div className='max-padd-container flexBetween'>
        {/* Logo */}
        <Link to={"/"} className='bold-24 flex-1 flex'>
          <span className='inline-flex'>
            <span className='inline-flex items-center justify-center p-2 h-8 w-8 bg-secondary text-white -rotate-[31deg] rounded-full'>F</span>
            ood
          </span>experss
        </Link>

        {/* Navbar */}
        <div className='flex-1'>
          <Navbar
            toggleMenu={toggleMenu}
            menuOpened={menuOpened}
            containerstyles={`${menuOpened ? "flex flex-col gap-y-12 h-screen w-[222px] absolute left-0 top-0 bg-white z-50 px-10 py-4 shadow-xl" : "hidden xl:flex gap-x-5 xl:gap-x-8 medium-15 rounded-full px-2 py-1"}`}
          />
        </div>

        {/* Right buttons */}
        <div className='flex-1 flex items-center justify-end gap-x-3 sm:gap-x-10'>
          {!menuOpened && (
            <CgMenuLeft onClick={toggleMenu} className='text-2xl xl:hidden cursor-pointer' />
          )}

          {/* Cart icon */}
          <Link to={"/cart"} className='flex relative'>
            <RiShoppingBasketLine className='text-2xl' />
            <span className='bg-secondary text-white medium-14 absolute left-3.5 -top-2.5 flexCenter w-4 h-4 rounded-full shadow-inner'>
              {getCartCount()}
            </span>
          </Link>

          {/* Login / Logout button */}
          <div className="group relative">
            {token ? (
              <>
                <button className="btn-outline !border-none flexCenter !py-3">
                  <TbUserCircle className="text-xl" />
                </button>

                <ul className="hidden group-hover:flex flex-col absolute right-0 top-11 bg-white shadow-lg rounded-md w-32 p-2 ring-1 ring-slate-200 z-50">
                  <li
                    onClick={() => navigate('/order')}
                    className="flex justify-between items-center px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                  >
                    <span>Orders</span>
                    <TbArrowNarrowRight className="text-gray-400" />
                  </li>

                  <hr className="my-1" />

                  <li
                    onClick={logout}
                    className="flex justify-between items-center px-2 py-1 cursor-pointer hover:bg-gray-100 rounded"
                  >
                    <span>Logout</span>
                    <TbArrowNarrowRight className="text-gray-400" />
                  </li>
                </ul>
              </>
            ) : (
              <div onClick={() => navigate('/login')}>
                <button className="btn-outline !border-none flexCenter gap-x-2 !py-3">
                  Login <RiUserLine className="text-xl" />
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
