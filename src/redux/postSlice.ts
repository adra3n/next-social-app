import { createSlice } from '@reduxjs/toolkit'
import { Post } from '../types'

const initialState: Post[] = []

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      return action.payload
    },

    updatePost: (state, action) => {
      const updatedPost = action.payload

      state = state.map((post) => {
        if (post.id === updatedPost.id) {
          return updatedPost
        }
        return post
      })
    },
  },
})

export const { setPosts, updatePost } = postSlice.actions
export default postSlice.reducer
