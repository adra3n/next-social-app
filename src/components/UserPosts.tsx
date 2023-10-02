import React from 'react'
import { useSelector } from 'react-redux'
import { Post } from '@/types'
import Link from 'next/link'

const UserPosts = ({
  ownerUsername,
  posts,
}: {
  ownerUsername: string
  posts: Post[]
}) => {
  const userPosts = posts.filter((post: Post) => {
    return post.username === ownerUsername
  })

  return (
    <div className="py-10 text-gray-700">
      <h2 className="text-lg font-semibold mb-4 text-center">
        Posts by {ownerUsername}:
      </h2>
      <div className="flex flex-wrap gap-4 items-center justify-center">
        {userPosts.map((post: Post) => (
          <Link href={`/posts/${post.id}`}>
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md hover:bg-blue-400 p-1"
            >
              <img
                src={post.imageUrl}
                alt={post.description}
                className="w-full h-40 object-cover"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default UserPosts
