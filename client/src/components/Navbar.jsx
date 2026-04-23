import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { MenuIcon, SearchIcon, TicketPlus, XIcon } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useUser();
  const { openSignIn } = useClerk();
  const navigate = useNavigate()

  return (
    <div className="fixed top-0 left-0 z-50 w-full flex items-center justify-between px-6 md:px-16 lg:px-36 py-5">
      {/* Logo */}
      <Link to="/" className="max-md:flex-1">
        <img src={assets.logo} alt="logo" className="w-36 h-auto" />
      </Link>

      {/* MENU SECTION */}
      <div
        className={`
          max-md:fixed max-md:top-0 max-md:right-0 
          ${showMenu ? "max-md:translate-x-0" : "max-md:translate-x-full"}
          transition-transform duration-300 
          max-md:w-3/4 max-md:h-full max-md:bg-black/80 
          max-md:flex max-md:flex-col max-md:items-center 
          max-md:pt-20 
          z-50
          md:flex md:flex-row md:static md:bg-white/10 
          md:backdrop-blur md:border md:border-gray-300/20 
          md:rounded-full md:py-3 md:px-8 gap-8
        `}
      >
        {/* Close Button (Mobile) */}
        <XIcon
          className="md:hidden absolute top-6 right-6 w-7 h-7 cursor-pointer text-white"
          onClick={() => setShowMenu(false)}
        />

        <Link to="/" onClick={() => setShowMenu(false)}>
          Home
        </Link>
        <Link to="/movies" onClick={() => setShowMenu(false)}>
          Movies
        </Link>
        <Link to="/theaters" onClick={() => setShowMenu(false)}>
          Theaters
        </Link>
        <Link to="/release" onClick={() => setShowMenu(false)}>
          Release
        </Link>
        <Link to="/favourate" onClick={() => setShowMenu(false)}>
          Favourites
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-8">
        <SearchIcon className="max-md:hidden w-6 h-6 cursor-pointer" />
        {!user ? (
          <button
            onClick={openSignIn}
            className="px-4 py-1 sm:px-7 sm:py-2 bg-primary hover:bg-primary-dull transition rounded-full font-medium cursor-pointer"
          >
            Login
          </button>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="My Bookings"
                labelIcon={<TicketPlus width={15} />} onClick={()=> navigate('/my-bookings')}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>


      {/* Mobile Menu Button */}
      <MenuIcon
        className="md:hidden w-8 h-8 cursor-pointer ml-4"
        onClick={() => setShowMenu(true)}
      />
    </div>
  );
};

export default Navbar;
