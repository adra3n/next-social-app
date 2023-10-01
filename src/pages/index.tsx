import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaComment, FaThumbsUp } from 'react-icons/fa'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import Menu from '@/components/Menu'
import { setPostModal } from '@/redux/postModalSlice'
import { setUsers } from '../redux/userSlice'
import { Post, User, Comment } from '../types'
import { setPosts } from '@/redux/postSlice'

//im using hardcoded user id for mocking user login
const clientUserId = 1

const Home: React.FC = () => {
  const [newComment, setNewComment] = useState<string>('')

  //useSelectors for redux
  const users = useSelector((state: any) => state.users)
  const posts = useSelector((state: any) => state.posts)
  const postModal = useSelector((state: any) => state.postModal)

  const router = useRouter()
  const dispatch = useDispatch()
  const serverUrl = 'http://localhost:3001'

  const openPostModal = (post: Post) => {
    try {
      localStorage.setItem('postModal', JSON.stringify(post))
      dispatch(setPostModal(post))
    } catch (error) {}
  }

  const closePostModal = () => {
    dispatch(setPostModal(null))
    console.log(postModal)
    localStorage.removeItem('postModal')
  }

  const findUsername = (userId: number) => {
    try {
      const user = users.find((user: User) => user.id === userId)
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
      dispatch(setPostModal(updatedPost))
      await axios.post(`${serverUrl}/posts/${postModal.id}/like`)
    } catch (error) {
      console.error('error updating likes>>>', error)
    }
  }

  const handleComment = async () => {
    if (postModal && newComment.trim() !== '') {
      try {
        const newCommentObj: Comment = {
          //  length+1 for mocking increment on db
          id: postModal.comments.length + 1,
          //logged in user id (using clientUserId for mock)
          userId: clientUserId,
          text: newComment,
        }

        // update the post with newCommentObj
        const updatedPost: Post = {
          ...postModal,
          comments: [...postModal.comments, newCommentObj],
        }
        dispatch(setPostModal(updatedPost))

        // axios post comment
        await axios.post(
          `${serverUrl}/posts/${postModal.id}/comments`,
          newCommentObj
        )
      } catch (error) {
        console.error('error posting comment>>>', error)
      }
      //clear newComment
      setNewComment('')
    }
  }

  //im getting posts and users with page load and setting them in states
  useEffect(() => {
    try {
      // checking modal post data in local storage
      const localPostModal = localStorage.getItem('postModal')
      if (localPostModal) {
        // parsing
        const postData = JSON.parse(localPostModal)
        console.log('post from localstorage', postData)
        // redirect
        router.push(`/posts/${postData.id}`)
      }
    } catch (error) {
      console.log('error gettin local data>>', error)
    }
    axios
      .get<Post[]>(`${serverUrl}/posts`)
      .then((response) => {
        dispatch(setPosts(response.data))
      })
      .catch((error) => {
        console.log('error getting posts>>>', error)
      })

    axios
      .get<User[]>(`${serverUrl}/users`)
      .then((response) => {
        dispatch(setUsers(response.data))
      })
      .catch((error) => {
        console.log('error getting users>>>', error)
      })
  }, [])

  return (
    <div className="bg-gray-200 min-h-screen ">
      <Menu />
      <div className="container lg:mt-[-100vh] lg:pl-[20vw] w-100vw">
        {/* posts */}
        <div className=" flex flex-col w-full justify-center items-center gap-5 text-gray-800  ">
          <h2 className="text-xl font-semibold mt-8">Your Feed</h2>
          {posts.map((post: Post) => (
            <div
              key={post.id}
              className="bg-white rounded-lg shadow-md w-56 lg:w-[30vw] hover:bg-blue-100"
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
                  <span className="italic flex gap-1 items-center">
                    <FaThumbsUp />
                    {post.likes} Likes
                  </span>
                  <span className="ml-5 italic flex gap-1 items-center">
                    <FaComment></FaComment>
                    {post.comments.length} Comments
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* modal */}
      {postModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-opacity-60 bg-black text-gray-800">
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
                </button>
                <span className="ml-2 italic">{postModal.likes} Likes</span>
              </div>
              {/* comments */}
              <h2 className="text-lg font-semibold  mb-2">Comments:</h2>

              <ul>
                {postModal.comments.map((comment: Comment) => (
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
