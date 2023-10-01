import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import axios from 'axios'
import { FaThumbsUp } from 'react-icons/fa'
import { User } from '@/types'
import Menu from '@/components/Menu'

interface Comment {
  id: number
  userId: number
  text: string
}

interface Post {
  id: number
  userId: number
  imageUrl: string
  description: string
  comments: Comment[]
  likes: number
  isLiked: boolean
}

const PostDetail: React.FC = () => {
  const router = useRouter()
  const { postId } = router.query

  const [post, setPost] = useState<Post | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [newComment, setNewComment] = useState<string>('')

  useEffect(() => {
    if (postId) {
      try {
        axios
          .get<Post>(`http://localhost:3001/posts/${postId}`)
          .then((response) => {
            setPost(response.data)
          })
      } catch (error) {
        console.log('error loading post data>>', error)
      }

      try {
        axios.get<User[]>('http://localhost:3001/users').then((response) => {
          setUsers(response.data)
        })
      } catch (error) {
        console.log('error loading users data>>', error)
      }

      localStorage?.removeItem('postModal')
    }
  }, [postId])

  const handleLike = async () => {
    //validation for postModal
    if (!post) {
      console.log('post not found')
      return
    }
    try {
      //updating post like count and setting isLiked boolean for simple like feature
      const updatedPost: Post = {
        ...post,
        likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        isLiked: !post.isLiked,
      }
      setPost(updatedPost)
      await axios.post(`http://localhost:3001/posts/${postId}/like`)
    } catch (error) {
      console.error('error updating likes>>>', error)
    }
  }

  const handleCommentSubmit = () => {
    if (post && newComment.trim() !== '') {
      try {
        //model for comment
        const newCommentObj: Comment = {
          //  length+1 for mocking increment on db
          id: post.comments.length + 1,
          userId: 1,
          text: newComment,
        }

        //im adding newCommentObject to post data as updatedPost
        const updatedPost = {
          ...post,
          comments: [...post.comments, newCommentObj],
        }
        setPost(updatedPost)

        //clear
        setNewComment('')
        //post
        axios.post(
          `http://localhost:3001/posts/${postId}/comments`,
          newCommentObj
        )
      } catch (error) {
        console.error('error posting comment>>>', error)
      }
    } else {
      alert('Not a valid comment')
    }
  }

  if (!post) {
    return <p>Loading...</p>
  }

  return (
    <div className="bg-gray-200 min-h-screen">
      <Menu />
      <div className="container lg:mt-[-100vh] lg:pl-[25vw] lg:pt-24">
        <div className="bg-white rounded-lg shadow-md h-full flex m-4">
          <img
            src={post.imageUrl}
            alt={post.description}
            className="w-2/3 object-cover"
          />
          <div className="p-4 w-1/3 text-gray-800">
            <p className="">{post.description}</p>
            <div className="flex items-center mt-2 mb-6">
              <button
                className={`text-blue-500 ${
                  post.isLiked ? 'text-blue-500' : 'text-gray-500'
                }`}
                onClick={handleLike}
              >
                <FaThumbsUp />
              </button>
              <span className="ml-2 italic">{post.likes} Likes</span>
            </div>
            <h2 className="text-lg font-semibold  mb-2">Comments:</h2>
            <ul className="space-y-2">
              {post.comments.map((comment) => (
                <li key={comment.id} className="text-gray-800">
                  <span className="font-semibold">
                    {users.find((user) => user.id === comment.userId)?.username}
                  </span>
                  - {comment.text}
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <input
                className="w-full p-2 border rounded"
                placeholder="Write Your Comment Here"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></input>
              <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={handleCommentSubmit}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
