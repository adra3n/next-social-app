import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Post, User } from '../types'

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [postModal, setPostModal] = useState<Post | null>(null)

  useEffect(() => {
    axios.get<Post[]>('http://localhost:3001/posts').then((response) => {
      setPosts(response.data)
    })
  }, [])

  const openPostModal = (post: Post) => {
    setPostModal(post)
  }

  const closePostModal = () => {
    setPostModal(null)
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-5">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md "
              onClick={() => openPostModal(post)}
            >
              <img
                src={post.imageUrl}
                alt={post.description}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-700">{post.description}</p>
                <div className="flex items-center mt-4">
                  <span className="ml-2 text-gray-700">{post.likes} Likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {postModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-50 bg-black">
          <button
            className="fixed top-10 right-10 text-white"
            onClick={closePostModal}
          >
            X
          </button>
          <div className="bg-white p-4 rounded-lg shadow-md w-1/2 h-2/3">
            <img
              src={postModal.imageUrl}
              alt={postModal.description}
              className="w-full h-2/3 object-contain"
            />
            <div className="p-4">
              <p className="text-gray-700">{postModal.description}</p>
              <div className="flex items-center mt-4 text-gray-700">
                <span>{postModal.likes} Likes</span>
              </div>
              <h2 className="text-2xl text-gray-700 font-semibold mt-4">
                Comments
              </h2>
              <ul>
                {postModal.comments.map((comment) => (
                  <li key={comment.id} className="text-gray-700">
                    <span className="font-semibold">{comment.username}</span> -{' '}
                    {comment.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
