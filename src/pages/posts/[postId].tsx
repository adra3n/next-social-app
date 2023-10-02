import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { FaThumbsUp } from 'react-icons/fa'

import Menu from '@/components/Menu'
import UserPosts from '@/components/UserPosts'

import { User } from '@/types'
import { setUsers } from '@/redux/userSlice'
import { setPosts } from '@/redux/postSlice'
import { Post, Comment } from '@/types'
import Link from 'next/link'

const serverUrl = 'http://localhost:3001'

const PostDetail: React.FC = () => {
  const users = useSelector((state: any) => state.users)
  const posts = useSelector((state: any) => state.posts)

  const [post, setPost] = useState<Post | null>(null)
  const [newComment, setNewComment] = useState<string>('')
  const [error, setError] = useState<string>('')

  const router = useRouter()
  const { postId } = router.query

  const dispatch = useDispatch()

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
      await axios.post(`${serverUrl}/posts/${postId}/like`)
    } catch (error) {
      console.error('error updating likes>>>', error)
    }
  }

  const handleComment = async () => {
    if (post && newComment.trim() !== '') {
      //model for comment
      const newCommentObj: Comment = {
        //  length+1 for mocking increment on db
        id: post.comments.length + 1,
        userId: 1,
        text: newComment,
      }
      try {
        //im adding newCommentObject to post data as updatedPost
        const updatedPost = {
          ...post,
          comments: [...post.comments, newCommentObj],
        }
        setPost(updatedPost)

        // axios post comment
        await axios.post(`${serverUrl}/posts/${postId}/comments`, newCommentObj)
      } catch (error) {
        console.error('error posting comment>>>', error)
      }
      //clear
      setNewComment('')
    } else {
      alert('Not a valid comment')
    }
  }

  useEffect(() => {
    if (postId) {
      //setting init users
      try {
        axios.get<Post>(`${serverUrl}/posts/${postId}`).then((response) => {
          setPost(response.data)
        })
      } catch (error) {
        console.log('error loading post data>>', error)
        setError('User not found')
      }

      //setting init posts
      try {
        axios.get<Post[]>(`${serverUrl}/posts`).then((response) => {
          dispatch(setPosts(response.data))
        })
      } catch (error) {
        console.log('error loading users data>>', error)
      }

      localStorage?.removeItem('postModal')
    }
  }, [postId])

  if (error) {
    return (
      <p className="flex flex-col  justify-center items-center w-screen h-screen">
        {error}
      </p>
    )
  }

  if (!post) {
    return (
      <p className="flex flex-col  justify-center items-center w-screen h-screen">
        Loading...
      </p>
    )
  }
  return (
    <div className="bg-gray-200 min-h-screen">
      <Menu />
      <div className="container lg:mt-[-100vh] lg:pl-[25vw] lg:pt-25">
        <div className="bg-white rounded-lg shadow-md  w-[90%] m-auto flex flex-row flex-wrap mt-6 py-6  text-gray-800 text-sm">
          <img
            src={post.imageUrl}
            alt={post.description}
            className="w-2/3 object-cover px-2 "
          />
          <div className="p-4 w-1/3 flex-col">
            <Link href={`/users/${post.userId}`}>
              <p className="font-semibold pb-3 hover:text-blue-500">
                {post.username}
              </p>
            </Link>{' '}
            <p className="mb-6">{post.description}</p>
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
            <h2 className="font-semibold  mb-2 ">Comments:</h2>
            <ul className="space-y-2">
              {post.comments.map((comment) => (
                <li key={comment.id} className="text-gray-800">
                  <span className="font-semibold">
                    {
                      users.find((user: User) => user.id === comment.userId)
                        ?.username
                    }
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
                onClick={handleComment}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
        {/* other posts of user */}
        <UserPosts ownerUsername={post.username} posts={posts} />
      </div>
    </div>
  )
}

export default PostDetail
