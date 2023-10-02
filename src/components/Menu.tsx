import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaBars, FaUser, FaHome, FaPlus } from 'react-icons/fa'
import Link from 'next/link'
import { Post } from '@/types'
import { setFilteredPosts } from '@/redux/filteredPostSlice'
import { filterPostsHelper } from '@/utils/filterPosts'

const Menu: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const posts = useSelector((state: any) => state.posts)

  const dispatch = useDispatch()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  //im filtering posts with searchQuery in useEffect
  useEffect(() => {
    const filteredPosts = filterPostsHelper(posts, searchQuery, 'all')
    console.log('filteredPosts', filteredPosts)
    dispatch(setFilteredPosts(filteredPosts))
  }, [searchQuery, posts, dispatch])

  return (
    <>
      {/* // Mobile and Tablet - Header with hamburger menu /// */}
      <header className=" lg:hidden  sticky min-w-full top-0 z-11 bg-white text-gray-700 shadow-lg">
        <div className="container py-4 min-w-full px-4">
          <div className="flex justify-between items-center">
            <div className="lg:text-2xl text-xl font-bold">
              <Link href="/">Insta</Link>
            </div>
            <div className="flex-2 mx-3  ">
              <input
                type="text"
                placeholder="Search"
                className="lg:w-96 lg:px-4 text-center py-2 border border-gray-300 rounded-full focus:outline-blue-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="hidden lg:flex flex-row gap-10 text-2xl  ">
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
              <div className="fixed inset-0 z-20 bg-black bg-opacity-60   flex items-center justify-center">
                <div className="bg-white py-32 rounded-lg shadow-md w-3/4  text-center">
                  <div className="text-2xl font-semibold mb-8">Menu</div>
                  <div className="cursor-pointer mb-4">
                    <Link href="/">Home</Link>
                  </div>
                  <div className="cursor-pointer mb-4">Profile</div>
                  <div className="cursor-pointer mb-4">Create Post</div>
                  <button
                    className="absolute top-4 right-4 text-white   text-2xl hover:text-gray-900"
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

      {/* ////Large Device - SideBar/// */}
      <header className="hidden lg:flex sticky bottom-0 overflow-y-auto h-screen w-1/4 max-w-[16rem] top-0 z-100 bg-white text-gray-700 shadow-lg">
        <div className="container py-5 px-5  ">
          <div className="flex items-start flex-col space-y-4">
            <div className="text-3xl font-bold  py-6 hover:text-blue-400 w-full  ">
              <Link href="/">Insta</Link>
            </div>

            <hr />
            <div className="">
              <Link href="/">
                <div className="cursor-pointer mb-4 flex items-center gap-3 flex-row hover:text-blue-400">
                  <FaHome /> Home
                </div>
              </Link>
              <Link href="#">
                <div className="cursor-pointer mb-4 flex items-center gap-3 flex-row hover:text-blue-400">
                  <FaUser /> Profile
                </div>
              </Link>
              <Link href="#">
                <div className="cursor-pointer mb-4 flex items-center gap-3 flex-row hover:text-blue-400">
                  <FaPlus /> Create Post
                </div>
              </Link>
            </div>
            <input
              type="text"
              placeholder="Search"
              className="px-4 text-center py-2 border border-gray-300 rounded-full focus:outline-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>
    </>
  )
}

export default Menu
