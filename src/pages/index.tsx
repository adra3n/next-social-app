import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Post, User, Comment } from '../types'
import { FaThumbsUp } from 'react-icons/fa'
import Header from '@/components/Header'

//im using hardcoded user id for mocking user login
const clientUserId = 1

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [postModal, setPostModal] = useState<Post | null>(null)
  const [users, setUsers] = useState<User[]>([])
  const [newComment, setNewComment] = useState<string>('')

  //im getting posts and users with page load and setting them in states
  useEffect(() => {
    axios
      .get<Post[]>('http://localhost:3001/posts')
      .then((response) => {
        setPosts(response.data)
      })
      .catch((error) => {
        console.log('error getting posts>>>', error)
      })

    axios
      .get<User[]>('http://localhost:3001/users')
      .then((response) => {
        setUsers(response.data)
      })
      .catch((error) => {
        console.log('error getting users>>>', error)
      })
  }, [])

  const openPostModal = (post: Post) => {
    setPostModal(post)
  }

  const closePostModal = () => {
    setPostModal(null)
  }

  const findUsername = (userId: number) => {
    try {
      const user = users.find((user) => user.id === userId)
      if (user) {
        return user.username
      } else {
        console.log('cant find user with id >>>', userId)
      }
    } catch (error) {
      console.log('error findUsername>>>', error)
    }
  }

  const handleLike = async () => {
    //validation for postModal for ts
    if (!postModal) {
      console.log('post not found')
      return
    }
    try {
      //updating post like count and setting isLiked boolean for simple like feature
      const updatedPost: Post = {
        ...postModal,
        likes: postModal.isLiked ? postModal.likes - 1 : postModal.likes + 1,
        isLiked: !postModal.isLiked,
      }
      setPostModal(updatedPost)
      await axios.post(`http://localhost:3001/posts/${postModal.id}/like`)
    } catch (error) {
      console.error('error updating likes>>>', error)
    }
  }

  const handleComment = async () => {
    if (!postModal) {
      console.log('post not found')
      return
    }

    try {
      const newCommentObj: Comment = {
        //im generating random id for mock (should be increment on backend)
        id: Math.floor(Math.random() * 100),
        //logged in user id (using clientUserId for mock)
        userId: clientUserId,
        text: newComment,
      }

      // update the post with newCommentObj
      const updatedPost: Post = {
        ...postModal,
        comments: [...postModal.comments, newCommentObj],
      }
      setPostModal(updatedPost)

      // axios post comment
      await axios.post(
        `http://localhost:3001/posts/${postModal.id}/comments`,
        newCommentObj
      )
      //clear newComment
      setNewComment('')
    } catch (error) {
      console.error('error posting comment>>>', error)
    }
  }

  return (
    <div className="bg-gray-200 min-h-screen ">
      <Header />

      <div className="container p-4 ">
        {/* posts */}
        <div className="flex flex-wrap flex-col justify-center gap-5 text-gray-800 lg:w-4/12 sm:w-1/2 ">
          <h2 className="text-xl font-semibold mt-4">Posts</h2>
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md "
              onClick={() => openPostModal(post)}
            >
              <img
                src={post.imageUrl}
                alt={post.description}
                className="w-full lg:h-96 object-cover"
              />
              <div className="p-4">
                <p>{post.description}</p>
                <div className="flex items-center mt-4">
                  <span className="italic">{post.likes} Likes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* modal */}
      {postModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-80 bg-black text-gray-800">
          <button
            className="fixed top-10 right-10 text-white text-xl"
            onClick={closePostModal}
          >
            X
          </button>
          <div className="bg-white rounded-lg shadow-md lg:w-2/3 sm:w-16 p-4 lg:flex ">
            <img
              src={postModal.imageUrl}
              alt={postModal.description}
              className="lg:w-2/3 object-cover  "
            />
            <div className="lg:pl-6 flex-column  ">
              <p className="font-serif italic mb-6">{postModal.description}</p>

              <hr></hr>
              <div className="flex items-center mt-2 mb-6 ">
                {/* like button color change*/}
                <button
                  className={`${
                    postModal.isLiked ? 'text-blue-500 ' : ' text-gray-500'
                  }`}
                  onClick={handleLike}
                >
                  <FaThumbsUp />
                </button>{' '}
                <span className="ml-2 italic">{postModal.likes} Likes</span>
              </div>
              {/* comments */}
              <h2 className="text-lg font-semibold  mb-2">Comments:</h2>

              <ul>
                {postModal.comments.map((comment) => (
                  <li key={comment.id} className="text-gray-800">
                    <span className="font-semibold">
                      {findUsername(comment.userId)}
                    </span>
                    - {comment.text}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <div>
                  <input
                    className="w-full p-2 border rounded"
                    placeholder="Write Your Comment Here"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  ></input>
                  <button
                    className="mt-2 px-4 py-2 bg-blue-500  hover:bg-blue-600  text-white rounded "
                    onClick={handleComment}
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
