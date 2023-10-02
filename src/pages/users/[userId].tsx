import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Post, User } from '@/types'
import UserPosts from '@/components/UserPosts'
import Menu from '@/components/Menu'

const UserProfile: React.FC = () => {
  const router = useRouter()
  const { userId } = router?.query
  console.log('userId', userId)
  const [user, setUser] = useState<User | null>(null)
  const [userPosts, setUserPosts] = useState<Post[]>([])
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (userId) {
      axios
        .get<User>(`http://localhost:3001/users/${userId}`)
        .then((response) => {
          setUser(response.data)
        })
        .catch((error) => {
          console.error('error getting userr>>>>', error)
          setError('User not found')
        })
      axios
        .get<Post[]>(`http://localhost:3001/posts?userId=${userId}`)
        .then((postsResponse) => {
          setUserPosts(postsResponse.data)
        })
        .catch((postsError) => {
          console.error('error getting user posts>>>>', postsError)
        })
    }
  }, [userId])

  if (error) {
    return (
      <p className="flex flex-col  justify-center items-center w-screen h-screen">
        {error}
      </p>
    )
  }

  if (!user) {
    return (
      <p className="flex flex-col  justify-center items-center w-screen h-screen">
        Loading...
      </p>
    )
  }

  console.log('user', user)
  return (
    <div className="bg-gray-200 min-h-screen text-gray-700">
      <Menu></Menu>
      <div className="container mx-auto lg:mt-[-100vh] lg:pl-[25vw] lg:pt-24">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h1 className="text-lg font-semibold mb-4">
            Profile:
            <span className="font-normal ml-2"> {user?.username}</span>
          </h1>
          <h2 className="text-lg font-semibold mb-4">
            Full Name:
            <span className="font-normal ml-2">{user?.fullName}</span>
          </h2>
          <UserPosts ownerUsername={user?.username} posts={userPosts} />
        </div>
      </div>
    </div>
  )
}

export default UserProfile
