import React, { useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { FaUser } from 'react-icons/fa'
import { FaHome } from 'react-icons/fa'
import { FaPlus } from 'react-icons/fa'

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky min-w-full top-0 z-10 bg-white text-gray-700 shadow-lg">
      <div className="container py-4 min-w-full px-4">
        <div className="flex justify-between items-center lg:px-20">
          <div className="lg:text-xl font-bold">Insta</div>
          <div className="flex-2 mx-3">
            <input
              type="text"
              placeholder="Search"
              className="lg:w-96 lg:px-4 text-center py-2 border border-gray-300 rounded-full focus:outline-blue-400"
            />
          </div>
          <div className="hidden lg:flex flex-1 flex-row gap-10">
            <div className="cursor-pointer">
              <FaPlus />
            </div>
            <div className="cursor-pointer">
              <FaUser />
            </div>
            <div className="cursor-pointer">
              <FaHome />
            </div>
          </div>

          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            <FaBars size={24} />
          </div>
          {isMenuOpen && (
            <div className="fixed inset-0 z-20 bg-black bg-opacity-80 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg shadow-md w-1/2  text-center">
                <div className="text-2xl font-semibold mb-8">Menu</div>
                <div className="cursor-pointer mb-4">Home</div>
                <div className="cursor-pointer mb-4">Profile</div>
                <div className="cursor-pointer mb-4">Create Post</div>
                <button
                  className="absolute top-4 right-4 text-white text-2xl hover:text-gray-900"
                  onClick={toggleMenu}
                >
                  X
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
