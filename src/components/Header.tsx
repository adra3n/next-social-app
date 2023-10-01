import React from 'react'

const Header: React.FC = () => {
  return (
    <header className="sticky min-w-full top-0 z-10 bg-white text-gray-700 shadow-lg ">
      <div className="container py-4 min-w-full">
        <div className="flex justify-between items-center lg:px-16">
          <div className="lg:text-xl font-bold">Insta</div>
          <div className="">
            <input
              type="text"
              placeholder="Search"
              className="lg:w-96 lg:px-4 text-center py-2 border border-gray-300 rounded-full focus:outline-blue-400 "
            />
          </div>
          <div className="flex gap-10 lg:text-xl font-semibold">
            <div className="cursor-pointer">Profile</div>
            <div className="cursor-pointer">+</div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
